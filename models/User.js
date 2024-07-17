import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
      default: [],
    },
    wishlist: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          name: {
            type: String,
            ref: "Product",
          },
          price: {
            type: Number,
            ref: "Product",
          },
          image: {
            type: String,
            ref: "Product",
          },
        },
      ],
      default: [],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
