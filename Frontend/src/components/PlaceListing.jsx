import { useState } from "react";
import PlaceCard from "./PlaceCard";
import LocationTab from "./LocationTab";
import { getPlaces } from "../lib/api/api.js";

function PlaceListing() {
  const locations = ["ALL", "Maldives", "UAE", "Italy", "Europe", "Tanzania"];

  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [places, setPlaces] = useState([]); // Start empty — no places shown initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  const fetchPlacesHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPlaces();
      setPlaces(data);
      setSelectedLocation("ALL"); // reset filter on load
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setLoading(false);
  };

  // Filter places by location
  const filteredHotels =
    selectedLocation === "ALL"
      ? places
      : places.filter((place) =>
          place.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );

  return (
    <>
      <section className="px-8 py-8 lg:py-2 ">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Discover The Best Party Venues Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect location for your next celebration, from intimate gatherings to grand parties.
          </p>

          {/* Fetch button */}
          <button
            onClick={fetchPlacesHandler}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load Places"}
          </button>
          {error && (
            <p className="mt-2 text-red-600 font-semibold">
              Error: {error}
            </p>
          )}
        </div>

        {/* Location filter tabs */}
        <div className="flex items-center gap-x-4 mb-12">
          {locations.map((location) => (
            <LocationTab
              key={location}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          ))}
        </div>

        {/* Places grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-4">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((place) => (
              <PlaceCard key={place._id} places={place} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No places to display. Click "Load Places" to fetch venues.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default PlaceListing;
