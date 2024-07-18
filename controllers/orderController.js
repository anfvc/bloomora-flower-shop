import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//* Placing an order:
export async function placeOrder() {
  try {
    const { userId, items, amount, address, pamymentMethod } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found." });
    }

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    //* Trying to create a payment intent with stripe:

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: amount, //amount from order model
      payment_method: pamymentMethod,
      metadata: { orderId: newOrder._id.toString() },
    });

    res.status(StatusCodes.CREATED).json({
      clientSecret: paymentIntent
    })


  } catch (error) {}
}
