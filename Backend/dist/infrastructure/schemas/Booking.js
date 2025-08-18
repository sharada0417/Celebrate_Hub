"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    placeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Places",
        required: true,
    },
    // Clerk user ids are strings (e.g. "user_xxx"), store as String
    userId: {
        type: String,
        required: true,
    },
    CheckIn: {
        type: Date,
        required: true,
    },
    CheckOut: {
        type: Date,
        required: true,
    },
    // store party types as an array of strings
    PartyType: {
        type: [String],
        enum: ["Couple Party", "Crowd Party", "Mixed"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID"],
        default: "PENDING",
    },
    paymentMethod: {
        type: String,
        enum: ["CARD", "BANK_TRANSFER"],
        default: "CARD",
    },
});
const Booking = mongoose_1.default.model("Booking", BookingSchema);
exports.default = Booking;
