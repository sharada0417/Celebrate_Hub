import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
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

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
