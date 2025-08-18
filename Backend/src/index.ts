// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config';

import ConnectedDB from "./infrastructure/db";
import placesRouter from "./api/places";
import bookingRouter from "./api/booking";
import GlobalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { clerkMiddleware } from '@clerk/express'
import bodyParser from "body-parser";
import { handleWebhook } from "./application/payment";
import paymentsRouter from "./api/payment";
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(clerkMiddleware());

// Fix: webhook route needs leading slash and raw body parser must be mounted on that exact path
app.post(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);

// Parse JSON requests (must be after the raw webhook route)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/places", placesRouter);

// Fix: mount booking router at /api/bookings so POST /api/bookings matches bookingRouter.route("/")
app.use("/api/bookings", bookingRouter);

app.use("/api/payments", paymentsRouter);

app.use(GlobalErrorHandlingMiddleware);

ConnectedDB();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
