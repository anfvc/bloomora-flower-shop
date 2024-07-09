import express from "express";
import {
  createProduct,
  showAllFilteredProducts,
  showAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    return callback(null, Date.now() + file.originalname);
  }, // filename is unique with Date.now()
  limits: { fileSize: 150000 },
});

const upload = multer({ storage: storage });

// We need to create a route for /images in server.js

router.post("/create", upload.single("image"), createProduct);
router.patch("/update/:id", updateProduct);
router.get("/show", showAllProducts)
router.get("/showFiltered", showAllFilteredProducts)


export default router;
