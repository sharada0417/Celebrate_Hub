import { Request, Response, NextFunction } from "express";
import Booking from "../infrastructure/schemas/Booking";
import { CreateBookingDTO } from "../domain/dtos/booking";
import ValidationError from "../domain/errors/validation-error";
import { clerkClient } from "@clerk/express";
import NotFoundError from "../domain/errors/not-found-error";

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = CreateBookingDTO.safeParse(req.body);

    if (!booking.success) {
      throw new ValidationError(booking.error.message);
    }

    const user = req.auth;
    

    // Add the booking
    const newBooking = await Booking.create({
      placeId: booking.data.placeId,
      userId: user.userId,
      CheckIn: booking.data.CheckIn,
      CheckOut: booking.data.CheckOut,
      PartyType: booking.data.PartyType,
    });

    // Return the response
    res.status(201).json(newBooking);
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

export const getBookingById = async(
  req:Request,
  res:Response,
  next:NextFunction
) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);

    if(!booking){
      throw new NotFoundError("Booking not found");
    }
    res.status(200).json(booking);
    return;
  } catch (error) {
    next(error);
  }
}
