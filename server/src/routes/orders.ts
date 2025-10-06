import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { prisma } from "../lib/prisma";

const router = Router();

router.use(authenticate);

router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany({ where: { userId: req.auth!.userId }, orderBy: { createdAt: "desc" }, include: { items: true, payments: true } });
  res.json(orders);
});

router.get("/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;
  const order = await prisma.order.findUnique({ where: { orderNumber }, include: { items: true, payments: true } });
  if (!order || order.userId !== req.auth!.userId) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;
