import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

function getSessionId(req: any): string | undefined {
  return (req.headers["x-session-id"] as string) || undefined;
}

async function resolveCart(req: any) {
  const sessionId = getSessionId(req);
  if (req.auth?.userId) {
    let cart = await prisma.cart.findFirst({ where: { userId: req.auth.userId }, include: { items: { include: { product: true } } } });
    if (!cart) cart = await prisma.cart.create({ data: { userId: req.auth.userId } });
    return cart;
  }
  if (sessionId) {
    let cart = await prisma.cart.findFirst({ where: { sessionId }, include: { items: { include: { product: true } } } });
    if (!cart) cart = await prisma.cart.create({ data: { sessionId } });
    return cart;
  }
  const newCart = await prisma.cart.create({ data: {} });
  return newCart;
}

router.get("/", async (req, res) => {
  const cart = await resolveCart(req);
  const items = await prisma.cartItem.findMany({ where: { cartId: cart.id }, include: { product: true } });
  res.json({ id: cart.id, items });
});

router.post("/items", async (req, res) => {
  const { productId, quantity } = req.body as { productId: string; quantity?: number };
  const qty = Math.max(1, quantity || 1);
  const cart = await resolveCart(req);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.isActive) return res.status(404).json({ message: "Product not found" });
  if (product.stock < qty) return res.status(400).json({ message: "Insufficient stock" });

  const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
  let item;
  if (existing) {
    item = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + qty } });
  } else {
    item = await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity: qty, priceCents: product.priceCents } });
  }
  res.status(201).json(item);
});

router.patch("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body as { quantity: number };
  const item = await prisma.cartItem.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "Item not found" });
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id } });
    return res.status(204).send();
  }
  const product = await prisma.product.findUnique({ where: { id: item.productId } });
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (product.stock < quantity) return res.status(400).json({ message: "Insufficient stock" });
  const updated = await prisma.cartItem.update({ where: { id }, data: { quantity } });
  res.json(updated);
});

router.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.cartItem.delete({ where: { id } });
  res.status(204).send();
});

export default router;
