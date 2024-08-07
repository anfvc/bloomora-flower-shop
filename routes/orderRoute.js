import express from "express"
import { createOrder, createStripeCheckoutSession } from "../controllers/orderController.js"

//!We should use the authMiddleware

const router = express.Router();

router.post("/createStripeCheckoutSession", createStripeCheckoutSession)
router.post("/createOrder", createOrder)
// router.post("/createStripeCheckoutSession/:id", createStripeCheckoutSession)

export default router;

