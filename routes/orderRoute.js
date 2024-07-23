import express from "express"
import { createStripeCheckoutSession } from "../controllers/orderController.js"

//!We should use the authMiddleware

const router = express.Router();

router.post("/createStripeCheckoutSession", createStripeCheckoutSession)

export default router;

