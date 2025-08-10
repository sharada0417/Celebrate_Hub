import Booking from "../infrastructure/schemas/Booking.js"


export const createBooking = async (req,res) => {
    const booking = req.body;

    //validate the request data
    if(
        !booking.placeId ||
        !booking.userId ||
        !booking.CheckIn ||
        !booking.CheckOut ||
        !booking.PartyType 
    ){
        res.status(400).send();
        return;
    }

    //Add the booking
    await Booking.create({
        placeId:booking.placeId,
        userId: booking.userId,
        CheckIn: booking.CheckIn,
        CheckOut: booking.CheckOut,
        PartyType: booking.PartyType,
    });

    //Return the response
    res.status(201).send();
    return;
}

export const getAllBookingForPlace = async (req,res) => {
    const placeId = req.params.placeId;
    const booking = await Booking.find({placeId:placeId}).populate("userId");

    res.status(200).json(booking);
    return;
}
export const getAllBookings = async (req,res) => {
    const places = await Booking.find();
    res.status(200).json(places);
    return;
}