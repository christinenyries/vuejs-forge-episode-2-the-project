import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const stripe = new Stripe(useRuntimeConfig().stripeSecret, {
    apiVersion: "2022-08-01",
  });
  const stripeProducts = await stripe.products.list({
    ids: Object.keys(body.products),
  });

  const lineItems = stripeProducts.data.map(
    (product) =>
      ({
        price: product.default_price,
        quantity: body.products[product.id].quantity,
        tax_rates: ["txr_1NBDYoKxTttPxraMQOVYO6NO"],
      } as Stripe.Checkout.SessionCreateParams.LineItem)
  );

  const baseURL = getRequestHeader(event, "origin") || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    cancel_url: `${baseURL}/cart`,
    success_url: `${baseURL}/checkout/success`,
    mode: "payment",
    line_items: lineItems,
  });

  return session;
});
