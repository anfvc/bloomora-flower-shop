import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";

export async function createProduct(req, res) {
  const imageFile = `${req.file.filename}`;

  const { name, description, price, category } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      image: imageFile,
    });

    res.status(StatusCodes.CREATED).json({
      id: newProduct._id,
      name: newProduct.name,
      msg: `${newProduct.name} has been created.`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }

  // const imageFile = `${req.file.filename}`;
  // const product = await Product.create(req.body);

  // res.status(StatusCodes.CREATED).json({
  //   name: product.name,
  //   msg: `${product.name} has been created.`,
  //   image: imageFile,
  // });
}

export async function updateProduct(req, res) {
  // const { id } = req.params;
  // const productToUpdate = { ...req.body };

  // const options = {
  //   new: true,
  //   runValidators: true,
  // };

  // const updatedProduct = await Product.findByIdAndUpdate(
  //   id,
  //   productToUpdate,
  //   options
  // );

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
