import { MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // fix: use react-router-dom

const PlaceCard = ({ places }) => {
  return (
    <Link to={`/places/${places._id}`}>
      <div className="relative h-56 overflow-hidden rounded-xl">
        <img
          src={places.image}
          alt={places.name}
          className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
        />
      </div>

      <div className="mt-3 space-y-2">
        <h3 className="font-semibold text-lg">{places.name}</h3>

        {/* Location */}
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{places.location}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">
            ${places.price?.toLocaleString() || "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
