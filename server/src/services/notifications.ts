import { prisma } from "../lib/prisma";

export async function notifyOrderStatus(orderId: string, status: string, reason?: string) {
  // Placeholder: integrate with email/SMS providers
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  // eslint-disable-next-line no-console
  console.log(`[notify] Order ${order?.orderNumber} status -> ${status}${reason ? ` (${reason})` : ""}`);
}
