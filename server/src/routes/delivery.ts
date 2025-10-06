import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.use(authenticate, requireRole(["DELIVERY", "ADMIN"]));

router.patch("/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body as { status: "OUT_FOR_DELIVERY" | "DELIVERED" | "FAILED"; notes?: string };
  if (!status) return res.status(400).json({ message: "Missing status" });
  const order = await prisma.order.update({ where: { id }, data: { status } });
  await prisma.orderStatusHistory.create({ data: { orderId: id, status, notes: notes || null, actorId: req.auth!.userId, actorRole: req.auth!.role } });
  res.json(order);
});

export default router;
