import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import cloudinary from "cloudinary"

export async function createProduct(req, res) {
  console.log("File Received", req.file);
  console.log("Body Data", req.body);

  let imageFile = `${req.file.filename}`;

  // const timestamp = Math.round((new Date()).getTime()/1000)

  // const signature = cloudinary.utils.api_sign_request({timestamp: timestamp}, cloudinary.config().process.env.CLOUD_API_SECRET)

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

export async function showAllProducts(req, res, next) {
  const allProducts = await Product.find()

  res.status(StatusCodes.OK).json(allProducts)
}


export const showAllFilteredProducts = async (req, res, next)=> {
  try {
    const {page = 1,
          sortby = "name",
          order = "asc"
    } = req.query

    const limit = 8;
    const skip = (page - 1) * limit

    const sortOrder = order === "desc" ? -1 : 1;

    const sortCriteria = {};
    sortCriteria[sortby] = sortOrder;

    const allProducts = await Product.find()
    .sort(sortCriteria)
    .skip(skip)
    .limit(limit)

    const products = await allProducts.exec()

    res.status(StatusCodes.OK).json(products)


  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
