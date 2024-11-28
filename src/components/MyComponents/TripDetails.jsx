import { useFirebase } from "@/context/firebase";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Utility function to convert keys to camelCase
const toCamelCase = (str) => {
  return str.replace(/([-_][a-z])/gi, (match) =>
    match.toUpperCase().replace("-", "").replace("_", "")
  );
};

// Function to normalize keys recursively to camelCase
const normalizeKeys = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(normalizeKeys); // Process arrays recursively
  }

  return Object.keys(obj).reduce((acc, key) => {
    const normalizedKey = toCamelCase(key); // Convert to camelCase
    acc[normalizedKey] = normalizeKeys(obj[key]); // Recursively normalize nested objects
    return acc;
  }, {});
};

export default function TripDetails() {
  const { id } = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSnap = await firebase.getData(id);
        if (dataSnap.exists) {
          const rawData = dataSnap.data();
          const normalizedData = normalizeKeys(rawData); // Normalize the data to camelCase
          console.log(normalizedData);
          setData(normalizedData);
        } else {
          console.error("No data found for this ID");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, firebase]);

  if (!data) {
    return (
      <p className="text-center text-xl animate-pulse">
        Loading trip details...
      </p>
    );
  }

  const hotels = data?.tripData?.tripData?.travelPlan?.hotels || [];
  const iti = data?.tripData?.tripData?.travelPlan?.itinerary || [];

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Hero Section */}
      <img
        src="/alt.png"
        alt={`Image of ${data.destination}`}
        className="w-full h-72 object-cover"
    />

      {/* Summary Section */}
      <div className="flex justify-between items-center my-6 bg-gray-100 p-4 rounded-lg shadow-md animate-fade-in transition-transform transform hover:scale-105">
  <div className="text-center animate-slide-in-left">
    <p className="text-lg font-semibold">Budget</p>
    <p className="text-blue-500">{data.budget || "N/A"}</p>
  </div>
  <div className="text-center animate-slide-in-up">
    <p className="text-lg font-semibold">Days</p>
    <p className="text-blue-500">{data.days || "N/A"}</p>
  </div>
  <div className="text-center animate-slide-in-right">
    <p className="text-lg font-semibold">Travelers</p>
    <p className="text-blue-500">{data.people || "N/A"}</p>
  </div>
</div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recommended Hotels</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <Link
                key={index}
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  hotel.hotelName
                )},${encodeURIComponent(hotel.hotelAddress)}`}
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // Prevents security risks
                className="block"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in">
                  <img
                    src="/alt.png"
                    alt={`image of ${hotel.hotelName}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{hotel.hotelName}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {hotel.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold">
                      Price: {hotel.price}
                    </p>
                    <p className="text-sm font-semibold">
                      Rating: {hotel.rating}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No hotels available for this trip.</p>
          )}
        </div>
      </div>
      {/* Itinerary Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Travel Plan</h2>
        {iti.length > 0 ? (
          iti.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-6">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
                {day.day}
              </h3>
              <div className="space-y-4">
                {day.places.map((place, placeIndex) => (
                  <Link
                    key={placeIndex}
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      place.placeName
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="p-4 bg-gray-50 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                      <div className="flex items-center space-x-4">
                        <img
                          src="/alt.png"
                          alt={`image of ${place.placeName}`}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <div>
                          <h4 className="text-lg font-bold">
                            {place.placeName}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {place.placeDetails}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Ticket Price: {place.ticketPricing}
                          </p>
                          <p className="text-sm font-semibold">
                            Best Time to Visit: {place.bestTimeToVisit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available for this trip.</p>
        )}
      </div>
    </div>
  );
}
