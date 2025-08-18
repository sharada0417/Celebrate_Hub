"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_1 = require("../application/Booking");
const authentication_error_1 = require("./middleware/authentication-error");
const bookingRouter = express_1.default.Router();
bookingRouter
    .route("/")
    .post(authentication_error_1.isAuthenticated, Booking_1.createBooking)
    .get(authentication_error_1.isAuthenticated, Booking_1.getAllBookings);
// <-- added missing leading slash here
bookingRouter.route("/places/:placeId").get(Booking_1.getAllBookingForPlace);
bookingRouter.route("/:bookingId").get(authentication_error_1.isAuthenticated, Booking_1.getBookingById);
exports.default = bookingRouter;
