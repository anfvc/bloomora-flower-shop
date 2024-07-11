import express from "express";
import {
  createProduct,
  // showAllFilteredProducts,
  showAllProducts,
  showAllProductsOnPage,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// We need to create a route for /images in server.js

router.use("/uploads", express.static("uploads"));
router.post("/create", upload.single("image"), createProduct);
router.patch("/update/:id", updateProduct);
router.get("/show", showAllProductsOnPage);
router.get("/show/all", showAllProducts)

// router.get("/showFiltered", showAllFilteredProducts);

export default router;
