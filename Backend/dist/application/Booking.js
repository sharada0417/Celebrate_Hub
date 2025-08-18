"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingById = exports.getAllBookings = exports.getAllBookingForPlace = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
const booking_1 = require("../domain/dtos/booking");
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const express_1 = require("@clerk/express");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const createBooking = async (req, res, next) => {
    try {
        const booking = booking_1.CreateBookingDTO.safeParse(req.body);
        if (!booking.success) {
            throw new validation_error_1.default(booking.error.message);
        }
        // Narrow auth so TypeScript knows userId exists
        const auth = req.auth;
        if (!auth?.userId) {
            throw new validation_error_1.default("User not authenticated");
        }
        // Add the booking (store userId as string)
        const newBooking = await Booking_1.default.create({
            placeId: booking.data.placeId,
            userId: auth.userId,
            CheckIn: booking.data.CheckIn,
            CheckOut: booking.data.CheckOut,
            PartyType: booking.data.PartyType,
        });
        res.status(201).json(newBooking);
    }
    catch (error) {
        next(error);
    }
};
exports.createBooking = createBooking;
const getAllBookingForPlace = async (req, res, next) => {
    try {
        const placeId = req.params.placeId;
        const booking = await Booking_1.default.find({ placeId: placeId });
        const bookingsWithUser = await Promise.all(booking.map(async (el) => {
            // el.userId is now a string (Clerk user id)
            const user = await express_1.clerkClient.users.getUser(el.userId);
            return {
                _id: el._id,
                placeId: el.placeId,
                CheckIn: el.CheckIn,
                CheckOut: el.CheckOut,
                PartyType: el.PartyType,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            };
        }));
        res.status(200).json(bookingsWithUser);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBookingForPlace = getAllBookingForPlace;
const getAllBookings = async (req, res, next) => {
    try {
        const places = await Booking_1.default.find();
        res.status(200).json(places);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBookings = getAllBookings;
const getBookingById = async (req, res, next) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await Booking_1.default.findById(bookingId);
        if (!booking) {
            throw new not_found_error_1.default("Booking not found");
        }
        res.status(200).json(booking);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getBookingById = getBookingById;
