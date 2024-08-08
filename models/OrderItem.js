import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderItem = model("OrderItem", orderItemSchema);

export default OrderItem;
