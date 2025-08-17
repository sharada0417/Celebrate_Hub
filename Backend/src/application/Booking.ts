import { Request, Response, NextFunction } from "express";
import Booking from "../infrastructure/schemas/Booking";
import { CreateBookingDTO } from "../domain/dtos/booking";
import ValidationError from "../domain/errors/validation-error";
import { clerkClient } from "@clerk/express";

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = CreateBookingDTO.safeParse(req.body);

    if (!booking.success) {
      throw new ValidationError(booking.error.message);
    }

    // ✅ Updated req.auth usage
    const authData = req.auth?.(); // call as function
    if (!authData || !authData.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Add the booking
    await Booking.create({
      placeId: booking.data.placeId,
      userId: authData.userId,
      CheckIn: booking.data.CheckIn,
      CheckOut: booking.data.CheckOut,
      PartyType: booking.data.PartyType,
    });

    // Return the response
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getAllBookingForPlace = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const placeId = req.params.placeId;
    const booking = await Booking.find({ placeId: placeId });

    const bookingsWithUser = await Promise.all(
      booking.map(async (el) => {
        const user = await clerkClient.users.getUser(el.userId);
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
      })
    );

    res.status(200).json(bookingsWithUser);
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const places = await Booking.find();
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
};
