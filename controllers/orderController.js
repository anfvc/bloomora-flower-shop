import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import OrderItem from "../models/OrderItem.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripeCheckoutSession(req, res) {
  // checkoutProducts should be an array of objects
  // [ { id: id of product, quantity: quantity of said product in the checkout basket } ]
  const { checkoutProducts, userId } = req.body;
  // const { userId } = req.params;
  // const { checkoutProducts } = req.body;
  const user = await User.findById(userId);
  const stripeUserId = user.stripeCustomerId || createUserInStripe(user);

  const checkoutParams = {
    customer: stripeUserId,
    line_items: await transformCheckoutProductsToLineItems(checkoutProducts),
    mode: "payment",
    success_url: `http://localhost:5173/success=${JSON.stringify(
      checkoutProducts
    )}`,
    cancel_url: `http://localhost:5173/cart`,
  };
  const session = await stripe.checkout.sessions.create(checkoutParams);

  res.status(200).json({ url: session.url });
}

async function transformCheckoutProductsToLineItems(checkoutProducts) {
  const checkoutProductsIds = checkoutProducts.map(
    (checkoutProduct) => checkoutProduct.id
  );
  const allStripeProducts = await stripe.products.list({
    limit: 100,
    ids: checkoutProductsIds,
  });
  const transformedLineItems = [];

  checkoutProducts.forEach((checkoutProduct) => {
    const stripeProduct = allStripeProducts.data.find(
      (product) => product.id === checkoutProduct.id
    );
    if (!stripeProduct) next();

    const newProduct = {
      price: stripeProduct.default_price,
      quantity: checkoutProduct.quantity,
    };
    transformedLineItems.push(newProduct);
  });

  return transformedLineItems;
}

async function createUserInStripe(user) {
  const stripeCustomer = await stripe.customers.create({
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  });

  await User.findByIdAndUpdate(user._id, {
    stripeCustomerId: stripeCustomer.id,
  });
  return stripeCustomer.id;
}

export async function getAllOrders(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    res.status(StatusCodes.OK).json(user.orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export async function createOrder(req, res) {
  const { checkoutProducts, userId, deliveryAddress } = req.body;

  const orderItems = await Promise.all(
    checkoutProducts.map(async (checkoutProduct) => {
      const { id, quantity } = checkoutProduct;
      return await OrderItem.create({
        quantity,
        product: { _id: new mongoose.ObjectId(id) },
      });
    })
  );

  const order = await Order.create({
    userId,
    orderItems,
    status: "paid",
    deliveryAddress,
    date: Date.now(),
  });

  res.status(200).json({ order });
}
