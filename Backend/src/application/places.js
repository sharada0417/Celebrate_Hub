import Place from "../infrastructure/schemas/places.js"

export const  getAllPlaces = async (req,res) => {
    const places = await Place.find();
    res.status(200).json(places);
    return;
};

export const getPlaceById = async (req,res) => {
    const placeId = req.params.id;
    const place = await Place.findById(placeId);
    if(!place){
        res.status(404).send();
        return;
    }

    res.status(200).json(place);
    return;
}

export const createPlace = async (req,res) => {
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
        res.status(400).send();
        return ;
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
}

export const deletePlace = async (req,res) => {
    const placeId = req.params.id;
    await Place.findByIdAndUpdate(placeId);

    //return the response
    res.status(200).send();
    return;
}

export const updateHotel = async (req,res) => {
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
        res.status(400).send();
        return;
    }

    await Place.findByIdAndUpdate(placeId,updatePlace);

    //return the response
    res.status(200).send();
    return;
}