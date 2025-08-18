"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const db_1 = __importDefault(require("./infrastructure/db"));
const places_1 = __importDefault(require("./api/places"));
const booking_1 = __importDefault(require("./api/booking"));
const global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
const express_2 = require("@clerk/express");
const body_parser_1 = __importDefault(require("body-parser"));
const payment_1 = require("./application/payment");
const payment_2 = __importDefault(require("./api/payment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
app.use((0, express_2.clerkMiddleware)());
// Fix: webhook route needs leading slash and raw body parser must be mounted on that exact path
app.post("/api/stripe/webhook", body_parser_1.default.raw({ type: "application/json" }), payment_1.handleWebhook);
// Parse JSON requests (must be after the raw webhook route)
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/places", places_1.default);
// Fix: mount booking router at /api/bookings so POST /api/bookings matches bookingRouter.route("/")
app.use("/api/bookings", booking_1.default);
app.use("/api/payments", payment_2.default);
app.use(global_error_handling_middleware_1.default);
(0, db_1.default)();
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`);
});
