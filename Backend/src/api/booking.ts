import express from 'express'
import { createBooking, getAllBookingForPlace, getAllBookings, getBookingById } from '../application/Booking';
import { isAuthenticated } from './middleware/authentication-error';

const bookingRouter = express.Router();
bookingRouter.route("/").post(isAuthenticated,createBooking).get(isAuthenticated,getAllBookings);
bookingRouter.route("places/:placeId").get(getAllBookingForPlace);
bookingRouter.route("/:bookingId").get(isAuthenticated,getBookingById)

export default bookingRouter;