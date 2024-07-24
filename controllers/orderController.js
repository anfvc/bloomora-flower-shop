import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";

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
    success_url: `https://google.com?products=${JSON.stringify(checkoutProducts)}`,
    cancel_url: `https://google.com`,
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

async function populateStripe() {
  products
    .sort(() => 0.5 - Math.random())
    .forEach(async (product, index) => {
      if (index % 20 === 0) {
        await new Promise((r) => setTimeout(r, 2000));
      }

      try {
        await stripe.products.create({
          name: product.name,
          description: product.description,
          id: product._id.$oid,
          images: [product.image],
          default_price_data: {
            currency: "eur",
            unit_amount: product.price * 100,
          },
        });
      } catch (e) {}
    });
}

// async function createRemainingProductToStripe() {
//   const product = {
//     _id: {
//       $oid: "668e6fc5153dff7eec8b323b",
//     },
//     name: "Roses Memory Lane",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis interdum vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce facilisis lorem dui, eu volutpat ex faucibus vel.",
//     price: 75.9,
//     image:
//       "https://res.cloudinary.com/dytfuzksa/image/upload/v1720610756/duwymkjkfyrglxzzhmyo.jpg",
//     category: "Flowers on Ocassion",
//     subcategory: "St. Valentine's Day",
//   };

//   try {
//     const stripeProduct = await stripe.products.create({
//       id: product._id.$oid,
//       name: product.name,
//       description: product.description,
//       images: [product.image],
//     });

//     const stripePrice = await stripe.prices.create({
//       product: stripeProduct.id,
//       unit_amount: product.price * 100,
//       currency: "eur",
//     });

//     console.log("Created:", stripeProduct);
//     console.log("Created price:", stripePrice);
//   } catch (error) {
//     console.log("Error Creating Product");
//   }
// }
