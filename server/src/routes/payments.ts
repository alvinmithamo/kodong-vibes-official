import { Router } from "express";
import { prisma } from "../lib/prisma";
import { config } from "../config";
import axios from "axios";

const router = Router();

router.post("/mpesa/stk", async (req, res, next) => {
  try {
    const { orderId, phoneNumber } = req.body as { orderId: string; phoneNumber: string };
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // get access token
    const auth = Buffer.from(`${config.mpesa.consumerKey}:${config.mpesa.consumerSecret}`).toString("base64");
    const tokenResp = await axios.get(
      config.mpesa.environment === "production"
        ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const accessToken = tokenResp.data.access_token;

    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const password = Buffer.from(`${config.mpesa.shortcode}${config.mpesa.passkey}${timestamp}`).toString("base64");

    const stkUrl = config.mpesa.environment === "production"
      ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const resp = await axios.post(
      stkUrl,
      {
        BusinessShortCode: config.mpesa.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(order.totalCents / 100),
        PartyA: phoneNumber,
        PartyB: config.mpesa.shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: config.mpesa.callbackUrl,
        AccountReference: order.orderNumber,
        TransactionDesc: `Order ${order.orderNumber}`,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    await prisma.payment.updateMany({ where: { orderId: order.id, provider: "MPESA" }, data: { reference: resp.data.CheckoutRequestID } });

    res.json({ checkoutRequestId: resp.data.CheckoutRequestID, merchantRequestId: resp.data.MerchantRequestID });
  } catch (err) {
    next(err);
  }
});

router.post("/flutterwave/initiate", async (req, res, next) => {
  try {
    const { orderId, email, name } = req.body as { orderId: string; email: string; name: string };
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: "Order not found" });
    const flwResp = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: order.orderNumber,
        amount: (order.totalCents / 100).toFixed(2),
        currency: order.currency,
        redirect_url: config.flutterwave.redirectUrl,
        customer: { email, name },
        customizations: { title: "Liquor Store", description: `Order ${order.orderNumber}` },
      },
      { headers: { Authorization: `Bearer ${config.flutterwave.secretKey}` } }
    );
    const link = flwResp.data?.data?.link;
    res.json({ link });
  } catch (err) {
    next(err);
  }
});

export default router;
