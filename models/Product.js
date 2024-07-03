import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
});

const Product = model("Product", productSchema);

export default Product;
