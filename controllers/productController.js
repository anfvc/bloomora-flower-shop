import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";

export async function createProduct(req, res) {
  let imageFile = req.file ? req.file.filename : null;
  // const { name, description, price, category, subcategory } = req.body;

  // try {
  //   const newProduct = await Product.create({
  //     name,
  //     description,
  //     price,
  //     category,
  //     subcategory,
  //     image: imageFile,
  //   });

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    subcategory: req.body.subcategory,
    image: imageFile,
  });

  try {
    await product.save();

    res.status(StatusCodes.CREATED).json({
      id: product._id,
      name: product.name,
      msg: `${product.name} has been created.`,
      image: product.image,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
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
