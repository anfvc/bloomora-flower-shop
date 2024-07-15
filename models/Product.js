import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Decor",
        "Eustoma",
        "Flowers on Ocassion",
        "Gifts",
        "House Plants",
        "Peonies",
        "Roses",
      ],
    },
    subcategory: {
      type: String,
      enum: [
        "Artificial",
        "Christmas",
        "For Home",
        "Birthday",
        "St. Valentine's Day",
        "Wedding Anniversary",
        "",
      ],
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Product = model("Product", productSchema);

export default Product;
