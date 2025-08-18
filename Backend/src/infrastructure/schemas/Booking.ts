import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    placeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Places",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    CheckIn:{
        type:Date,
        required:true,
    },
    CheckOut:{
        type:Date,
        required:true,
    },
    PartyType:[{
        type: String,
        enum: ["Couple Party", "Crowd Party", "Mixed"],
        required: true
    }],
    paymentStatus:{
        type:String,
        enum:["PENDING","PAID"],
        default:"CARD"
    },
    paymentMethod:{
        type:String,
        enum:["CARD","BANK_TRANSFER"],
        default:"CARD"
    }
})

const Booking = mongoose.model("Booking",BookingSchema);

export default Booking;