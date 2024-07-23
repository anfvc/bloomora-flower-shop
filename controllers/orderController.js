import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripeCheckoutSession(req, res) {
  // checkoutProducts should be an array of objects
  // [ { id: id of product, quantity: quantity of said product in the checkout basket } ]
  const { checkoutProducts, userId } = req.body;
  const user = await User.findById(userId);
  const stripeUserId = user.stripeCustomerId || createUserInStripe(user);

  const checkoutParams = {
    customer: stripeUserId,
    line_items: await transformCheckoutProductsToLineItems(checkoutProducts),
    mode: 'payment',
    success_url: `https://google.com`,
    cancel_url: `https://google.com`,
  };
  const session = await stripe.checkout.sessions.create(checkoutParams);

  res.status(200).json({ url: session.url });
}

async function transformCheckoutProductsToLineItems(checkoutProducts) {
  const checkoutProductsIds = checkoutProducts.map((checkoutProduct) => checkoutProduct.id);
  const allStripeProducts = await stripe.products.list({
    limit: 100,
    ids: checkoutProductsIds,
  });
  const transformedLineItems = [];

  checkoutProducts.forEach((checkoutProduct) => {
    const stripeProduct = allStripeProducts.data.find(product => product.id === checkoutProduct.id);
    if (!stripeProduct) next();

    const newProduct = {
      price: stripeProduct.default_price,
      quantity: checkoutProduct.quantity,
    }
    transformedLineItems.push(newProduct);
  });

  return transformedLineItems;
}

async function createUserInStripe(user) {
  const stripeCustomer = await stripe.customers.create({
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  });

  await User.findByIdAndUpdate(user._id, { stripeCustomerId: stripeCustomer.id });
  return stripeCustomer.id;
}

async function populateStripe() {
  products.sort(() => .5 - Math.random()).forEach(async (product, index) => {
    if (index % 20 ===  0) {
      await new Promise(r => setTimeout(r, 2000));
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
    } catch(e) {
    }
  });
}
