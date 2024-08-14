import express from "express";
import {
  // createOrder,
  createStripeCheckoutSession,
  getAllOrders,
  saveDeliveryAddress
} from "../controllers/orderController.js";

//!We should use the authMiddleware

const router = express.Router();

router.post(
  "/createStripeCheckoutSession/:userId/:orderId",
  createStripeCheckoutSession
);
router.get("/all/:userId", getAllOrders);
// router.post("/createOrder/:userId", createOrder);
router.post("/address/:userId", saveDeliveryAddress)

export default router;
