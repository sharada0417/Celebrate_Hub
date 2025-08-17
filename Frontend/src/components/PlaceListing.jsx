import { useState } from "react";
import { Hotel } from "lucide-react"; // Added Hotel icon
import PlaceCard from "./PlaceCard";
import { useGetPlaceForSerchQueryQuery, useGetPlacesQuery } from "../lib/api";
import { useSelector } from "react-redux";

function PlaceListing() {
  const searchValue = useSelector((state) => state.search.value);
  const { data: allPlaces, isLoading: isAllLoading, isError: isAllError, error: allError } = useGetPlacesQuery({
    skip: !!searchValue,
  });
  const { data: searchPlaces, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useGetPlaceForSerchQueryQuery(
    { query: searchValue },
    { skip: !searchValue }
  );

  // Map search results to ensure correct structure
  const places = searchValue
    ? (searchPlaces || []).map((item) => item.place).filter((place) => place && place._id) // Ensure valid place and _id
    : allPlaces || [];

  const isLoading = searchValue ? isSearchLoading : isAllLoading;
  const isError = searchValue ? isSearchError : isAllError;
  const error = searchValue ? searchError : allError;

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-2">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Discover The Best Party Venues Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect location for your next celebration, from intimate gatherings to grand parties.
          </p>
        </div>
        <div className="flex items-center justify-center gap-x-2 text-red-500">
          <Hotel className="h-5 w-5" /> {/* Added hotel icon */}
          <span>Creating thing</span>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-2">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Discover The Best Party Venues Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect location for your next celebration, from intimate gatherings to grand parties.
          </p>
        </div>
        <div className="text-red-500">
          {searchValue ? `No results found for "${searchValue}"` : error?.message || "Something went wrong"}
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-2">
      <div className="mb-5">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Discover The Best Party Venues Worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Find the perfect location for your next celebration, from intimate gatherings to grand parties.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {places.length > 0 ? (
          places.map((place) => (
            <PlaceCard key={place._id} places={place} />
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            {searchValue ? `No hotels found for "${searchValue}"` : "No hotels available"}
          </div>
        )}
      </div>
    </section>
  );
}

export default PlaceListing;