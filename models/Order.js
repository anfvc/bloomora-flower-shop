import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = model("Order", orderSchema);

export default Order;
