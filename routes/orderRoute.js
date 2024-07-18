import express from "express"
import { placeOrder } from "../controllers/orderController.js"

//!We should use the authMiddleware

const router = express.Router();

router.post("/place", placeOrder)

export default router;


