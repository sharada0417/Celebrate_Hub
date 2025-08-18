"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
app.use((0, express_2.clerkMiddleware)());
// CORS middleware (must be before routes)
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.post("api/stripe/webhook", body_parser_1.default.raw({ type: "application/json" }), payment_1.handleWebhook);
// Parse JSON requests
app.use(express_1.default.json());
// Routes
app.use("/api/places", places_1.default);
app.use("/api/booking", booking_1.default);
app.use("/api/booking", payment_2.default);
app.use(global_error_handling_middleware_1.default);
(0, db_1.default)();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`);
});
