import {
  FaDollarSign,
  FaHandshake,
  FaUserFriends,
  FaHeart,
  FaHome,
} from "react-icons/fa";

export const priceCategories = [
  {
    icon: <FaDollarSign className="text-green-500" />,
    heading: "Cheap",
    text: "Budget-friendly options that won't break the bank.",
  },
  {
    icon: <FaDollarSign className="text-yellow-500" />,
    heading: "Moderate",
    text: "Balanced pricing for great value and experience.",
  },
  {
    icon: <FaDollarSign className="text-red-500" />,
    heading: "Expensive",
    text: "Luxurious and premium choices for a top-tier experience.",
  },
];

export const companyCategories = [
  {
    icon: <FaHandshake className="text-blue-500" />,
    heading: "Just Me",
    text: "Perfect for solo adventurers.",
    people: "Me",
  },
  {
    icon: <FaUserFriends className="text-purple-500" />,
    heading: "With Friends",
    text: "Great experiences to share with friends.",
    people: "4 Persons",
  },
  {
    icon: <FaHeart className="text-pink-500" />,
    heading: "Couple",
    text: "Romantic settings for you and your partner.",
    people: "Couple",
  },
  {
    icon: <FaHome className="text-yellow-500" />,
    heading: "Family",
    text: "Fun and safe for the entire family.",
    people: "7 Persons",
  },
];

export const prompt = 
  `Generate a travel plan in JSON format for the following details: 
  Location: (location), Days: (days), Company: (company), Budget: (budget). 

  Ensure all property names are in camelCase. The JSON must follow this structure:

  {
    "budget": "string",
    "days": "number",
    "destination": "string",
    "company": "string",
    "tripData": {
      "travelPlan": {
        "budget": "string",
        "company": "string",
        "days": "number",
        "hotels": [
          {
            "hotelName": "string",
            "hotelAddress": "string",
            "price": "string",
            "hotelImageUrl": "string",
            "geoCoordinates": "string",
            "rating": "string",
            "description": "string"
          }
        ],
        "itinerary": [
          {
            "day": "string",
            "places": [
              {
                "placeName": "string",
                "placeDetails": "string",
                "placeImageUrl": "string",
                "geoCoordinates": "string",
                "ticketPricing": "string",
                "timeTravel": "string",
                "bestTimeToVisit": "string"
              }
            ]
          }
        ],
        "location": "string"
      }
    }
  }

  Ensure:
  - The plan includes at least two hotels with complete details under the "hotels" array.
  - The itinerary suggests 2 to 3 places to visit each day.
  - All fields are filled with relevant and accurate data.
  `;
