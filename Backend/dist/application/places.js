"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = exports.updateHotel = exports.deletePlace = exports.createPlace = exports.getPlaceById = exports.getAllPlaces = void 0;
const places_1 = __importDefault(require("../infrastructure/schemas/places"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const place_1 = require("../domain/dtos/place");
const openai_1 = __importDefault(require("openai"));
const stripe_1 = __importDefault(require("../infrastructure/stripe"));
const getAllPlaces = async (req, res, next) => {
    try {
        const places = await places_1.default.find();
        res.status(200).json(places);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getAllPlaces = getAllPlaces;
const getPlaceById = async (req, res, next) => {
    try {
        const placeId = req.params.id;
        const place = await places_1.default.findById(placeId);
        if (!place) {
            throw new not_found_error_1.default("Place not found");
        }
        res.status(200).json(place);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getPlaceById = getPlaceById;
const createPlace = async (req, res, next) => {
    try {
        const validationResult = place_1.CreatePlaceDTO.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({
                message: "Invalid place data",
                errors: validationResult.error.format(),
            });
            return;
        }
        const placeData = validationResult.data;
        const stripeProduct = await stripe_1.default.products.create({
            name: placeData.name,
            description: placeData.description,
            default_price_data: {
                unit_amount: Math.round(parseFloat(placeData.price) * 100),
                currency: "usd"
            }
        });
        // Add the place
        const place = new places_1.default({
            name: placeData.name,
            location: placeData.location,
            image: placeData.image,
            description: placeData.description,
            suitableFor: placeData.suitableFor,
            price: parseInt(placeData.price),
            services: placeData.services,
            stripePriceId: stripeProduct.default_price
        });
        await place.save();
        res.status(201).json(place);
    }
    catch (error) {
        console.error("Error Creating hotel:", error);
        res.status(500).json({
            message: "Failed to create place",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.createPlace = createPlace;
const deletePlace = async (req, res, next) => {
    try {
        const placeId = req.params.id;
        await places_1.default.findByIdAndUpdate(placeId);
        //return the response
        res.status(200).send();
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.deletePlace = deletePlace;
const updateHotel = async (req, res, next) => {
    try {
        const placeId = req.params.id;
        const updatePlace = req.body;
        //validate the request
        if (!updatePlace.name ||
            !updatePlace.location ||
            !updatePlace.suitableFor ||
            !updatePlace.image ||
            !updatePlace.description ||
            !updatePlace.rating ||
            !updatePlace.reviews ||
            !updatePlace.price ||
            !updatePlace.services) {
            throw new validation_error_1.default("Invalid place data");
        }
        await places_1.default.findByIdAndUpdate(placeId, updatePlace);
        //return the response
        res.status(200).send();
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.updateHotel = updateHotel;
const generateResponse = async (req, res, next) => {
    const { messages } = req.body;
    const openai = new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages.length === 1
            ? [
                {
                    role: "system",
                    content: "You are Celebrate Hubs smart party booking assistant, helping users quickly find, compare, and book the perfect venues and services for birthdays, weddings, and special celebrations. ",
                },
                ...messages,
            ]
            : messages,
        store: true,
    });
    res.status(200).json({
        messages: [
            ...messages,
            { role: "assistant", content: completion.choices[0].message.content }
        ]
    });
    return;
};
exports.generateResponse = generateResponse;
