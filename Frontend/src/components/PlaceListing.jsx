import { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import LocationTab from "./LocationTab";
import { getPlaces } from "../lib/api/api.js";

function PlaceListing() {
  const locations = ["ALL", "Maldives", "UAE", "Italy", "Europe", "Tanzania"];

  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [places, setPlaces] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    setError("");

    getPlaces()
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredHotels =
    selectedLocation === "ALL"
      ? places
      : places.filter((place) =>
          place.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );

  if (loading) {
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
        <div className="text-red-500">Loading...</div>
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
        <div className="text-red-500">{error}</div>
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

      <div className="flex items-center gap-x-4 mb-12">
        {locations.map((location, i) => (
          <LocationTab
            key={i}
            selectedLocation={selectedLocation}
            name={location}
            onClick={handleSelectedLocation}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.map((place) => (
          <PlaceCard key={place._id} places={place} />
        ))}
      </div>
    </section>
  );
}

export default PlaceListing;
