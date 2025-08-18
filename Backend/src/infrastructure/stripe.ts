import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECERATE_KEY as string);

export default stripe;