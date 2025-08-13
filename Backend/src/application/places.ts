import { Request,Response,NextFunction } from "express";
import Place from "../infrastructure/schemas/places"
import NotFoundError from "../domain/not-found-error";
import ValidationError from "../domain/validation-error";

export const  getAllPlaces = async (req : Request ,res :Response ,next :NextFunction) => {
    try {
       const places = await Place.find();
       res.status(200).json(places);
        return; 
    } catch (error) {
        next(error);
    }
    
};

export const getPlaceById = async (req : Request ,res :Response ,next :NextFunction) => {
    try {
        const placeId = req.params.id;
    const place = await Place.findById(placeId);
    if(!place){
        throw new NotFoundError("Place not found");
    }

    res.status(200).json(place);
    return;
    } catch (error) {
        next(error);
    }
}

export const createPlace = async (req : Request,res:Response , next : NextFunction) => {
    try {
        const place = req.body;

    //validate the request data
    if(
        !place.name ||
        !place.location ||
        !place.suitableFor ||
        !place.image ||
        !place.description ||
        !place.rating ||
        !place.reviews ||
        !place.price ||
        !place.services 
    ) {
        throw new ValidationError("Invalid place data");
    }

    //Add the hotel
    await Place.create({
        name : place.name,
        location : place.location,
        image :place.image,
        description:place.description,
        suitableFor : place.suitableFor,
        rating: parseFloat(place.rating),
        reviews : parseFloat(place.reviews),
        price : parseInt(place.price),
        services: place.services
    });

        //return the response
        res.status(201).send();
        return;
    } catch (error) {
        next(error);
    }
}

export const deletePlace = async (req : Request,res:Response ,next :NextFunction) => {
    try {
       const placeId = req.params.id;
    await Place.findByIdAndUpdate(placeId);

    //return the response
    res.status(200).send();
    return; 
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const placeId = req.params.id;
    const updatePlace = req.body;

    //validate the request
    if(
        !updatePlace.name ||
        !updatePlace.location ||
        !updatePlace.suitableFor ||
        !updatePlace.image ||
        !updatePlace.description ||
        !updatePlace.rating ||
        !updatePlace.reviews ||
        !updatePlace.price ||
        !updatePlace.services 
    ) {
        throw new ValidationError("Invalid place data");
    }

    await Place.findByIdAndUpdate(placeId,updatePlace);

    //return the response
    res.status(200).send();
    return;
    } catch (error) {
        next(error);
    }
}