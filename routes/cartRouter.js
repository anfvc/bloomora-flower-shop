import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartData,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add/:userId", addToCart);
router.post("/remove/:userId", removeFromCart);
router.get("/get/:userId", getCartData);

export default router;
