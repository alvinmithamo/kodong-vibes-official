import { Router } from "express";
import { z } from "zod";
import dayjs from "dayjs";
import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const customerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().min(7).optional(),
});

const addressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1),
  deliveryNotes: z.string().optional(),
  deliverySlot: z.string().optional(),
});

const ageSchema = z.object({ dob: z.string() });

const paymentSchema = z.object({ method: z.enum(["COD", "MPESA", "FLUTTERWAVE"]) });
const promoSchema = z.object({ code: z.string().min(1) });

router.post("/start", async (req, res) => {
  const checkoutId = uuidv4();
  const cartId = (req.body?.cartId as string) || undefined;
  await redis.hmset(`checkout:${checkoutId}`, { step: "start", cartId: cartId || "" });
  await redis.expire(`checkout:${checkoutId}`, 60 * 30);
  res.status(201).json({ checkoutId });
});

router.post("/:id/customer", async (req, res) => {
  const { id } = req.params;
  const data = customerSchema.parse(req.body);
  await redis.hmset(`checkout:${id}`, { step: "customer", customer: JSON.stringify(data) });
  await redis.expire(`checkout:${id}`, 60 * 30);
  res.status(200).json({ ok: true });
});

router.post("/:id/address", async (req, res) => {
  const { id } = req.params;
  const data = addressSchema.parse(req.body);
  await redis.hmset(`checkout:${id}`, { step: "address", address: JSON.stringify(data) });
  await redis.expire(`checkout:${id}`, 60 * 30);
  res.status(200).json({ ok: true });
});

router.post("/:id/age", async (req, res) => {
  const { id } = req.params;
  const { dob } = ageSchema.parse(req.body);
  const age = dayjs().diff(dayjs(dob), "year");
  if (age < 18) return res.status(400).json({ message: "Must be of legal drinking age" });
  await redis.hmset(`checkout:${id}`, { step: "age", dob });
  await redis.expire(`checkout:${id}`, 60 * 30);
  res.status(200).json({ ok: true });
});

router.post("/:id/payment", async (req, res) => {
  const { id } = req.params;
  const { method } = paymentSchema.parse(req.body);
  await redis.hmset(`checkout:${id}`, { step: "payment", method });
  await redis.expire(`checkout:${id}`, 60 * 30);
  res.status(200).json({ ok: true });
});

router.post("/:id/promo", async (req, res) => {
  const { id } = req.params;
  const { code } = promoSchema.parse(req.body);
  const promo = await prisma.promoCode.findUnique({ where: { code } });
  if (!promo || !promo.isActive || (promo.startsAt && new Date() < promo.startsAt) || (promo.endsAt && new Date() > promo.endsAt)) {
    return res.status(400).json({ message: "Invalid promo code" });
  }
  await redis.hmset(`checkout:${id}`, { promoCode: code });
  await redis.expire(`checkout:${id}`, 60 * 30);
  res.status(200).json({ ok: true });
});

router.post("/:id/confirm", async (req, res) => {
  const { id } = req.params;
  const checkout = await redis.hgetall(`checkout:${id}`);
  if (!checkout || !checkout.cartId) return res.status(400).json({ message: "Invalid checkout session" });

  const cart = await prisma.cart.findUnique({ where: { id: checkout.cartId }, include: { items: { include: { product: true } } } });
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

  // Ensure stock and calculate totals
  let subtotal = 0;
  for (const item of cart.items) {
    if (!item.product.isActive || item.product.stock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${item.product.name}` });
    }
    subtotal += item.quantity * item.product.priceCents;
  }

  const customer = checkout.customer ? JSON.parse(checkout.customer) : undefined;
  const address = checkout.address ? JSON.parse(checkout.address) : undefined;
  const deliverySlot = address?.deliverySlot || null;

  if (!customer || !address || !checkout.method) return res.status(400).json({ message: "Missing checkout steps" });

  // Determine discount from promo code
  let discountCents = 0;
  let promoId: string | null = null;
  if (checkout.promoCode) {
    const promo = await prisma.promoCode.findUnique({ where: { code: checkout.promoCode } });
    if (promo && promo.isActive && (!promo.startsAt || new Date() >= promo.startsAt) && (!promo.endsAt || new Date() <= promo.endsAt)) {
      if (promo.type === "PERCENT") {
        discountCents = Math.floor((subtotal * promo.value) / 100);
      } else {
        discountCents = promo.value;
      }
      if (discountCents < 0) discountCents = 0;
      if (discountCents > subtotal) discountCents = subtotal;
      promoId = promo.id;
    }
  }

  // Create order and reserve stock (simple decrement here; in production use transactional locks)
  const orderNumber = `LS-${Date.now()}`;

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        orderNumber,
        userId: cart.userId || null,
        status: "PENDING_PAYMENT",
        paymentMethod: checkout.method as any,
        subtotalCents: subtotal,
        discountCents: discountCents,
        totalCents: subtotal - discountCents,
        promoCodeId: promoId,
        deliveryLine1: address.line1,
        deliveryLine2: address.line2 || null,
        deliveryCity: address.city,
        deliveryState: address.state || null,
        deliveryPostal: address.postalCode || null,
        deliveryCountry: address.country,
        deliveryNotes: address.deliveryNotes || null,
        deliverySlot: deliverySlot || null,
        ageVerified: !!checkout.dob,
        items: {
          create: cart.items.map((i) => ({
            productId: i.productId,
            productName: i.product.name,
            brandName: undefined,
            priceCents: i.priceCents,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // decrement stock
    for (const i of cart.items) {
      await tx.product.update({ where: { id: i.productId }, data: { stock: { decrement: i.quantity } } });
    }

    // clear cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return createdOrder;
  });

  // Create payment record
  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: checkout.method as any,
      status: checkout.method === "COD" ? "PENDING" : "PENDING",
      amountCents: order.totalCents,
      currency: order.currency,
    },
  });

  res.status(201).json({ order, payment });
});

export default router;
