import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartData,
  increaseQuantityCart,
  decreaseQuantityCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add/:userId", addToCart);
router.post("/increase/:userId", increaseQuantityCart);
router.post("/decrease/:userId", decreaseQuantityCart);
router.delete("/remove/:userId", removeFromCart);
router.get("/get/:userId", getCartData);

export default router;
