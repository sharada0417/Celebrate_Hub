import { Skeleton } from '@/components/ui/skeleton';
import { useCreateBookingMutation, useGetPlaceByIdQuery } from '@/lib/api';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { CheckCircle } from "lucide-react";
import { BookingDialog } from '@/components/BookingDailog';
import { toast } from 'sonner';

const Placepage = () => {
  const { id } = useParams();
  const { data: place, isLoading, isError, error } = useGetPlaceByIdQuery(id);
  const [createBooking,{isLoading:isCreateBookingLoading}] = useCreateBookingMutation();

  const navigate = useNavigate();

    const handleBook = async (bookingData) => {
    try {
      const booking = await createBooking(bookingData).unwrap();
      // navigate to payment page with booking id
      navigate(`/booking/payment?bookingId=${booking._id}`);
      // Removed toast.success here; success message now only on complete page after payment
    } catch (error) {
      console.log(error);
      toast.error("Booking failed");
    }
  }

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

  // UI for place data
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
            {place.suitableFor?.map((tag, index) => (
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

          {/* Description */}
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            {place.description}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500 font-semibold">
              ⭐ {place.rating}
            </span>
            <span className="text-gray-500">
              {place.reviews} reviews
            </span>
          </div>

          {/* Services */}
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <ul className="grid grid-cols-2 gap-3 mb-6 text-gray-700">
            {place.services?.map((service, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <span>{service}</span>
              </li>
            ))}
          </ul>

          {/* Price & Booking Row */}
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-orange-700">
              ${place.price}
            </p>
            <BookingDialog
            placeName={place.name}
            placeId={id}
            onSubmit={handleBook}
            isLoading={isCreateBookingLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placepage;