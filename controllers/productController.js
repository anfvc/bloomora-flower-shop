import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";

export async function createProduct(req, res) {
  console.log("File Received", req.file);
  console.log("Body Data", req.body);

  let imageFile = req.file ? req.file.filename : null;
  const { name, description, price, category, subcategory } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      subcategory,
      image: imageFile,
    });


    res.status(StatusCodes.CREATED).json({
      id: newProduct._id,
      name: newProduct.name,
      msg: `${newProduct.name} has been created.`,
      image: newProduct.image,
    });
    console.log("This Product has been created!", newProduct);
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
