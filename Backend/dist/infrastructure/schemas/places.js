"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const placesSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    suitableFor: [{
            type: String,
            required: false
        }],
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    reviews: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    services: [{
            type: String,
            required: true,
        }],
    stripePriceId: {
        type: String,
        required: true
    }
});
const Place = mongoose_1.default.model("Places", placesSchema);
exports.default = Place;
