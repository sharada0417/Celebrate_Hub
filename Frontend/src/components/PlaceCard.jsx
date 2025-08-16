import { MapPin, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const PlaceCard = (props) => {
  return (

    <Link 
      to={`/places/${props.places._id}`}>
      <div className="relative h-56 overflow-hidden rounded-xl">
        <img
          src={props.places.image}
          alt={props.places.name}
          className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
        />
      </div>

      <div className="mt-3 space-y-2">
        <h3 className="font-semibold text-lg">{props.places.name}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{props.places.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium">{props.places.rating}</span>
          <span className="text-muted-foreground">
            ({props.places.reviews.toLocaleString()} reviews)
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">${props.places.price}</span>
        </div>
      </div>
      </Link>
  );
};

export default PlaceCard;
