import { Request,Response,NextFunction } from "express";
import Place from "../infrastructure/schemas/places"
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { CreatePlaceDTO } from "../domain/dtos/place";
import OpenAI from "openai";
import stripe from "../infrastructure/stripe";

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

export const createPlace = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = CreatePlaceDTO.safeParse(req.body);

    if(!validationResult.success){
        res.status(400).json({
            message:"Invalid place data",
            errors:validationResult.error.format(),
        });
        return;
    }

    const placeData = validationResult.data;

    const stripeProduct = await stripe.products.create({
        name:placeData.name,
        description:placeData.description,
        default_price_data:{
            unit_amount : Math.round(parseFloat(placeData.price) * 100),
            currency: "usd"
        }
    })

    // Add the place
     const place = new Place({
      name: placeData.name,
      location: placeData.location,
      image: placeData.image,
      description: placeData.description,
      suitableFor: placeData.suitableFor,
      price: parseInt(placeData.price),
      services: placeData.services,
      stripePriceId:stripeProduct.default_price
    });

    await place.save();
    res.status(201).json(place);
  } catch (error) {
    console.error("Error Creating hotel:",error);
    res.status(500).json({
        message : "Failed to create place",
        error: error instanceof Error ? error.message : String(error),
    })
  }
};

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

export const generateResponse = async (req:Request,res:Response,next:NextFunction) => {
    const {messages } = req.body;

    const openai = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
        model:"gpt-4o",
        messages:
            messages.length === 1
            ? [
            {
                role:"system",
                content:"You are Celebrate Hubs smart party booking assistant, helping users quickly find, compare, and book the perfect venues and services for birthdays, weddings, and special celebrations. ", 
            },
            ...messages,
        ]
        : messages,
        store:true,
    });

    res.status(200).json({ 
        messages : [
            ...messages,
            { role : "assistant",content:completion.choices[0].message.content}
        ]
    });
    return;
}