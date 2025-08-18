import express  from "express"
import { isAuthenticated } from "./middleware/authentication-error";
import { createCheckoutSession, retrieveSessionStatus } from "../application/payment";

const paymentsRouter = express.Router();

paymentsRouter.route("/create-checkout-session").post(isAuthenticated,createCheckoutSession);
paymentsRouter.route("/session-status").get(isAuthenticated,retrieveSessionStatus);

export default paymentsRouter;