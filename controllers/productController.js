import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import cloudinary from "../middleware/cloudinary.js";
import fs from "fs";

export async function createProduct(req, res) {
  
  const { name, description, price, category, subcategory, createdBy } =
    req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    // console.log(result);

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      subcategory,
      createdBy,
      image: result.secure_url,
    });

    res.status(StatusCodes.CREATED).json({
      id: newProduct._id,
      name: newProduct.name,
      msg: `${newProduct.name} has been created.`,
      image: newProduct.image,
    });
    console.log("This Product has been created!", newProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    msg: `${updatedProduct.name} has been updated.`,
  });

  console.log(`${updatedProduct.name} has been updated.`);
}

export async function showAllProductsOnPage(req, res, next) {
  const { page } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;
  const allProducts = await Product.find().skip(skip).limit(limit);

  res.status(StatusCodes.OK).json(allProducts);
}

export async function showAllProducts(req, res, next) {
  const allProducts = await Product.find();

  res.status(StatusCodes.OK).json(allProducts);
}

export const showAllPaginatedFilteredProducts = async (req, res, next) => {
  try {
    // const { page = 1, sortby = "name", sortdir = "",category } = req.query;

    const { page = 1, category } = req.query;

    const limit = 10;
    const skip = (page - 1) * limit;

    const allProducts = await Product.find()
      // .sort(sortCriteria)
      .where("category")
      .equals(category)
      // .sort({ [sortby]: sortdir })
      .sort(category)
      .skip(skip)
      .limit(limit);

    // const products = await allProducts.exec();

    // const totalProd = await Product.countDocuments()

    res.status(StatusCodes.OK).json(allProducts); //{products: allProducts}
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const showFilteredProducts = async (req, res, next) => {
  try {
    const { category } = req.query;

    const allProducts = await Product.find()

      .where("category")
      .equals(category)
      .sort(category);

    // console.log("allProducts", allProducts)
    res.status(StatusCodes.OK).json(allProducts);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

