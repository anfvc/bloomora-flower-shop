import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartData,
  increaseQuantityCart,
  decreaseQuantityCart,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add/:userId", addToCart);
router.post("/increase/:userId", increaseQuantityCart);
router.post("/decrease/:userId", decreaseQuantityCart);
router.delete("/remove/:userId", removeFromCart);
router.get("/get/:userId", getCartData);
router.delete("/clear/:userId", clearCart)


export default router;
