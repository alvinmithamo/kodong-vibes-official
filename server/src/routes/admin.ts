import { Router } from "express";
import { prisma } from "../lib/prisma";
import { notifyOrderStatus } from "../services/notifications";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.use(authenticate, requireRole(["ADMIN"]));

router.get("/orders", async (_req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: true, payments: true } });
  res.json(orders);
});

router.patch("/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status: any };
  const order = await prisma.order.update({ where: { id }, data: { status } });
  await prisma.orderStatusHistory.create({ data: { orderId: id, status, notes: "status update", actorId: req.auth!.userId, actorRole: req.auth!.role } });
  await notifyOrderStatus(order.id, status, "Updated by admin");
  res.json(order);
});

router.post("/products", async (req, res) => {
  const { name, slug, description, images, categoryId, brandId, abv, volumeMl, priceCents, stock } = req.body;
  const product = await prisma.product.create({ data: { name, slug, description, images: images || [], categoryId, brandId, abv, volumeMl, priceCents, stock } });
  res.status(201).json(product);
});

router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await prisma.product.update({ where: { id }, data });
  res.json(product);
});

router.get("/reports/summary", async (_req, res) => {
  const [orders, payments] = await Promise.all([
    prisma.order.findMany(),
    prisma.payment.findMany(),
  ]);
  const totalSales = payments.filter(p => p.status === "SUCCESS").reduce((sum, p) => sum + p.amountCents, 0);
  res.json({ ordersCount: orders.length, paymentsCount: payments.length, totalSalesCents: totalSales });
});

// Delivery agents management
router.get("/agents", async (_req, res) => {
  const agents = await prisma.deliveryAgent.findMany({ orderBy: { createdAt: "desc" } });
  res.json(agents);
});

router.post("/agents", async (req, res) => {
  const { name, phone } = req.body as { name: string; phone: string };
  const agent = await prisma.deliveryAgent.create({ data: { name, phone } });
  res.status(201).json(agent);
});

router.patch("/agents/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body as { name?: string; phone?: string; active?: boolean };
  const agent = await prisma.deliveryAgent.update({ where: { id }, data });
  res.json(agent);
});

export default router;
