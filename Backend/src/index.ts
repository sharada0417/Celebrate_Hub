import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectedDB from "./infrastructure/db";
import usersRouter from "./api/user";
import placesRouter from "./api/places";
import bookingRouter from "./api/booking";
import GlobalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import {clerkMiddleware } from '@clerk/express'
dotenv.config();

const app: Application = express();

// Parse JSON requests
app.use(express.json());

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


ConnectedDB();

// Routes
app.use("/api/users", usersRouter);
app.use("/api/places", placesRouter);
app.use("/api/booking", bookingRouter);


app.use(GlobalErrorHandlingMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
