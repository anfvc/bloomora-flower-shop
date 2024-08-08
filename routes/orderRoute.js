import express from "express"
import { createOrder, createStripeCheckoutSession, getAllOrders } from "../controllers/orderController.js"

//!We should use the authMiddleware

const router = express.Router();

router.post("/createStripeCheckoutSession", createStripeCheckoutSession)
router.get("/getOrders", getAllOrders)
router.post("/createOrder", createOrder)

export default router;

