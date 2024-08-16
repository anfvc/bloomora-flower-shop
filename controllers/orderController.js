import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import OrderItem from "../models/OrderItem.js";
import validator from "validator";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripeCheckoutSession(req, res) {
  // checkoutProducts should be an array of objects
  // [ { id: id of product, quantity: quantity of said product in the checkout basket } ]
  const { userId, orderId /* adding orderId */ } = req.params;
  const { checkoutProducts } = req.body;
  const user = await User.findById(userId);
  // const stripeUserId = user.stripeCustomerId || createUserInStripe(user);

  let stripeUserId = user.stripeCustomerId;

  if (validator.isUUID(stripeUserId)) {
    stripeUserId = await createUserInStripe(user);
  }

  const checkoutParams = {
    customer: stripeUserId,
    line_items: await transformCheckoutProductsToLineItems(checkoutProducts),
    mode: "payment",
    success_url: `http://localhost:5173/success?checkoutProducts=${JSON.stringify(
      checkoutProducts
    )}`,
    cancel_url: `http://localhost:5173/cart`,
  };
  const session = await stripe.checkout.sessions.create(checkoutParams);

  //* Trying this part:

  const orderItems = await Promise.all(
    checkoutProducts.map(async (checkoutProduct) => {
      const { id, quantity } = checkoutProduct;
      return await OrderItem.create({
        quantity,
        product: { _id: new mongoose.Types.ObjectId(id) },
      });
    })
  );

  await Order.findByIdAndUpdate(
    orderId,
    { orderItems, status: "Paid" },
    { new: true }
  );

  // await User.findByIdAndUpdate(
  //   userId,
  //   { $push: { orders: order._id } },
  //   { new: true }
  // );

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
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate({
      path: "orderItems",
      populate: {
        path: "product",
        select: "name price image",
      },
    });
    // const user = await User.findById(userId)
    if (!orders) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "You have no existing orders." });
    }

    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

// export async function createOrder(req, res) {
//   // const { checkoutProducts, userId, deliveryAddress } = req.body;
//   const { checkoutProducts } = req.body;
//   const { userId } = req.params;

//   const orderItems = await Promise.all(
//     checkoutProducts.map(async (checkoutProduct) => {
//       const { id, quantity } = checkoutProduct;
//       return await OrderItem.create({
//         quantity,
//         product: { _id: new mongoose.Types.ObjectId(id) },
//       });
//     })
//   );

//   const order = await Order.create({
//     userId: { _id: new mongoose.Types.ObjectId(userId) },
//     orderItems,
//     status: "paid",
//     // deliveryAddress
//     date: Date.now(),
//   });

//   await User.findByIdAndUpdate(
//     userId,
//     { $push: { orders: order._id } },
//     { new: true }
//   );

//   res.status(200).json({ order });
// }

export async function saveDeliveryAddress(req, res) {
  const { userId } = req.params;
  const { deliveryAddress } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User does not exist." });
    }

    const order = await Order.create({
      userId: user._id,
      deliveryAddress,
    });

    res.status(StatusCodes.OK).json({ orderId: order._id });
  } catch (error) {}
}
