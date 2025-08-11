export const getPlaces = async () => {
  const res = await fetch("http://localhost:5000/api/places", {
    method: "GET",
  });
  if (!res.ok) {  // Fix: !res.ok, not !!res.ok
    throw new Error("Failed to fetch Places");
  }
  const data = await res.json();
  return data;
};
