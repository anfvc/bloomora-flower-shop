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
  category: {
    type: String,
  },
});

const Product = model("Product", productSchema);

export default Product;
