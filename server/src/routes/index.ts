import { Router } from "express";
import auth from "./auth";
import products from "./products";
import cart from "./cart";
import checkout from "./checkout";
import orders from "./orders";
import admin from "./admin";
import payments from "./payments";
import webhooks from "./webhooks";
import delivery from "./delivery";

export const router = Router();

router.use("/auth", auth);
router.use("/products", products);
router.use("/cart", cart);
router.use("/checkout", checkout);
router.use("/orders", orders);
router.use("/admin", admin);
router.use("/payments", payments);
router.use("/webhooks", webhooks);
router.use("/delivery", delivery);

export default router;
