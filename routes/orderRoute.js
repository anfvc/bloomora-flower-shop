import express from "express";
import {
  createOrder,
  createStripeCheckoutSession,
  getAllOrders,
} from "../controllers/orderController.js";

//!We should use the authMiddleware

const router = express.Router();

router.post(
  "/createStripeCheckoutSession/:userId",
  createStripeCheckoutSession
);
router.get("/all/:userId", getAllOrders);
router.post("/createOrder/:userId", createOrder);

export default router;
