import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase";
import { useNavigate } from "react-router-dom";

export default function TripHistory() {
  const firebase = useFirebase();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const fetchedTrips = await firebase.fetchAllData();
        setTrips(fetchedTrips); // Store fetched trips in state
      } catch (error) {
        console.error("Error fetching trip history:", error);
      }
    };

    fetchTrips();
  }, [firebase]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trip History</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="p-4 border rounded-md shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/trip-details/${trip.id}`)} // Navigate on click
          >
            <img
              src="/alt.png" // Default to a placeholder if no image is available
              alt={`Image of ${trip.destination}`}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{trip.destination}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
