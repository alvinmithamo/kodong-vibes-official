import { Router } from "express";
import { prisma } from "../lib/prisma";
import { webhookLimiter } from "../middleware/rateLimit";
import { config } from "../config";

const router = Router();

router.post("/mpesa", webhookLimiter, async (req, res) => {
  const payload = req.body;
  const checkoutRequestId: string | undefined = payload?.Body?.stkCallback?.CheckoutRequestID;
  const resultCode: number | undefined = payload?.Body?.stkCallback?.ResultCode;

  if (!checkoutRequestId) return res.status(400).json({ message: "Invalid payload" });

  const existing = await prisma.webhookEvent.findUnique({ where: { externalId: checkoutRequestId } });
  if (existing) return res.status(200).json({ ok: true });
  await prisma.webhookEvent.create({ data: { provider: "MPESA", externalId: checkoutRequestId, rawPayload: payload } });

  const payment = await prisma.payment.findFirst({ where: { reference: checkoutRequestId } });
  if (payment) {
    const success = resultCode === 0;
    await prisma.payment.update({ where: { id: payment.id }, data: { status: success ? "SUCCESS" : "FAILED", rawPayload: payload } });
    if (success) {
      await prisma.order.update({ where: { id: payment.orderId }, data: { status: "PAID" } });
    }
  }

  res.json({ ok: true });
});

router.post("/flutterwave", webhookLimiter, async (req, res) => {
  const signature = req.headers["verif-hash"]; // Flutterwave signature header
  if (!signature || signature !== config.flutterwave.webhookSecret) {
    return res.status(401).send("Invalid signature");
  }

  const payload = req.body;
  const txRef: string | undefined = payload?.data?.tx_ref;
  const id: string | number | undefined = payload?.data?.id;

  if (!txRef || !id) return res.status(400).json({ message: "Invalid payload" });

  const externalId = String(id);
  const existing = await prisma.webhookEvent.findUnique({ where: { externalId } });
  if (existing) return res.status(200).json({ ok: true });
  await prisma.webhookEvent.create({ data: { provider: "FLUTTERWAVE", externalId, rawPayload: payload, signature: String(signature) } });

  const order = await prisma.order.findUnique({ where: { orderNumber: txRef } });
  if (order) {
    await prisma.payment.updateMany({ where: { orderId: order.id, provider: "FLUTTERWAVE" }, data: { status: "SUCCESS", reference: externalId, rawPayload: payload } });
    await prisma.order.update({ where: { id: order.id }, data: { status: "PAID" } });
  }

  res.json({ ok: true });
});

export default router;
