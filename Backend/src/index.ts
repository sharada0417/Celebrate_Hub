import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectedDB from "./infrastructure/db";
import placesRouter from "./api/places";
import bookingRouter from "./api/booking";
import GlobalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import {clerkMiddleware } from '@clerk/express'
import bodyParser from "body-parser";
import { handleWebhook } from "./application/payment";
import paymentsRouter from "./api/payment";
dotenv.config();

const app = express();


app.use(clerkMiddleware());

// CORS middleware (must be before routes)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.post(
  "api/stripe/webhook",
  bodyParser.raw({ type :"application/json"}),
  handleWebhook
)

// Parse JSON requests
app.use(express.json());

// Routes
app.use("/api/places", placesRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/booking", paymentsRouter);

app.use(GlobalErrorHandlingMiddleware);

ConnectedDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
