import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartData,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/fetch", getCartData);

export default router;
