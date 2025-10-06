import dotenv from "dotenv";

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "8080", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "changeme",
  corsOrigin: (process.env.CORS_ORIGIN || "*").split(",").map(v => v.trim()),
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  baseUrl: process.env.BASE_URL || "http://localhost:8080",
  // M-Pesa (Daraja)
  mpesa: {
    environment: process.env.MPESA_ENV || "sandbox", // sandbox | production
    consumerKey: process.env.MPESA_CONSUMER_KEY || "",
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || "",
    shortcode: process.env.MPESA_SHORTCODE || "",
    passkey: process.env.MPESA_PASSKEY || "",
    callbackUrl: process.env.MPESA_CALLBACK_URL || "",
  },
  // Flutterwave
  flutterwave: {
    secretKey: process.env.FLW_SECRET_KEY || "",
    publicKey: process.env.FLW_PUBLIC_KEY || "",
    webhookSecret: process.env.FLW_WEBHOOK_SECRET || process.env.FLW_SECRET_KEY || "",
    redirectUrl: process.env.FLW_REDIRECT_URL || "",
  }
} as const;
