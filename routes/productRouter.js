import express from "express";
import {
  createProduct,
  // showAllFilteredProducts,
  showAllProducts,
  showAllPaginatedFilteredProducts,
  updateProduct,
  showAllProductsOnPage,
  showFilteredProducts
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import checkRole from "../middleware/checkRole.js";


const router = express.Router();

// We need to create a route for /images in server.js


router.use("/uploads", express.static("uploads"));
router.post("/create", /* checkRole("admin") */ upload.single("image"), createProduct);
router.patch("/update/:id", checkRole("admin"), updateProduct);
router.get("/show", showAllProductsOnPage);
// router.get("/show", showAllFilteredProducts);
router.get("/show/all", showAllProducts)

router.get("/show/filtered", showAllPaginatedFilteredProducts);

router.get("/show/filtered/all", showFilteredProducts)

export default router;
