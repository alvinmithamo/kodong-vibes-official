/* Simple Express server for M-PESA STK Push integration.
   NOTE: Replace placeholders with your Safaricom Daraja credentials.
*/
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Config from env
const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_PASSKEY,
  MPESA_SHORTCODE, // Till/Paybill (BusinessShortCode)
  MPESA_ENV = 'sandbox', // 'sandbox' | 'production'
  MPESA_CALLBACK_URL, // public https callback url to receive STK callback
} = process.env;

const DARAJA_BASE = MPESA_ENV === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';

async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await fetch(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  if (!res.ok) throw new Error(`Token error ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

function timestamp() {
  const d = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : n);
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function generatePassword() {
  const ts = timestamp();
  const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${ts}`).toString('base64');
  return { password, ts };
}

// Start STK Push
app.post('/api/mpesa/stkpush', async (req, res) => {
  try {
    const { phone, amount, accountReference = 'KKMerch', transactionDesc = 'Merch Purchase' } = req.body;
    if (!phone || !amount) return res.status(400).json({ error: 'phone and amount are required' });

    const token = await getAccessToken();
    const { password, ts } = generatePassword();

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: ts,
      TransactionType: 'CustomerPayBillOnline', // For paybill and till, STK works with this
      Amount: Number(amount),
      PartyA: phone, // customer phone, format 2547XXXXXXXX
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    const stkRes = await fetch(`${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const data = await stkRes.json();
    if (!stkRes.ok) return res.status(400).json(data);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Query STK Push status
app.post('/api/mpesa/stkquery', async (req, res) => {
  try {
    const { CheckoutRequestID } = req.body;
    if (!CheckoutRequestID) return res.status(400).json({ error: 'CheckoutRequestID required' });

    const token = await getAccessToken();
    const { password, ts } = generatePassword();

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: ts,
      CheckoutRequestID,
    };

    const qRes = await fetch(`${DARAJA_BASE}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const data = await qRes.json();
    if (!qRes.ok) return res.status(400).json(data);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// M-PESA asynchronous callback receiver (set this URL in your Daraja app)
app.post('/api/mpesa/callback', (req, res) => {
  try {
    // Safaricom posts the result here
    console.log('M-PESA Callback:', JSON.stringify(req.body));
    // Always respond 200 to acknowledge receipt
    res.json({ received: true });
  } catch (e) {
    res.json({ received: true });
  }
});

// Simple health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`M-PESA server listening on :${port}`));
