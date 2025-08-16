import { Skeleton } from '@/components/ui/skeleton';
import { useGetPlaceByIdQuery } from '@/lib/api';
import React from 'react';
import { useParams } from 'react-router';

const Placepage = () => {
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetPlaceByIdQuery(id);

  // Loading state
  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );

  // Error state
  if (isError)
    return <p className="text-red-500">Error: {error?.message}</p>;

  // UI for hotel data
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side - Image */}
        <div>
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {hotel.suitableFor?.map((tag, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
          <p className="text-gray-600 mb-4">{place.location}</p>
          <p className="text-lg mb-4">{place.description}</p>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500 font-semibold">
              ⭐ {hotel.rating}
            </span>
            <span className="text-gray-500">
              {hotel.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-green-600 mb-6">
            ${hotel.price}
          </p>

          {/* Services */}
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-6">
            {hotel.services?.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>

          {/* Booking button */}
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placepage;
