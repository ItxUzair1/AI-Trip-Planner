import React, { useState } from "react";
import { priceCategories, companyCategories, prompt } from "./Option"; // Import the price categories array
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { chatSession } from "./Gemini";
import { useFirebase } from "@/context/firebase";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import the loading spinner icon

export default function CreateTrip() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [days, setDays] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const firebase = useFirebase();
  const navigate = useNavigate();

  const API_KEY = "AlzaSyHLpNPk4bstRg3tDq5Tag9mnVJ6eV1bFII"; // Replace with your actual API key
  const API_URL = "https://maps.gomaps.pro/maps/api/place/queryautocomplete/json";

  // Fetch suggestions from API
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}?input=${encodeURIComponent(input)}&key=${API_KEY}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.predictions) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.description);
    setSuggestions([]);
  };

  const generateTrip = async () => {
    if (!query.trim()) {
      alert("Please enter a destination.");
      return;
    }
  
    const numberOfDays = Number(days);
    if (!numberOfDays || numberOfDays <= 0 || numberOfDays > 5) {
      alert("Please enter a valid number of days (1 to 5).");
      return;
    }
  
    if (!selectedBudget) {
      alert("Please select a budget category.");
      return;
    }
  
    if (!selectedCompany) {
      alert("Please select your company.");
      return;
    }
  
    setIsLoading(true); // Start loading
    firebase.setForm(true);
  
    const Prompt = prompt
      .replace("(location)", query)
      .replace("(days)", days)
      .replace("(Company)", selectedCompany)
      .replace("(budget)", selectedBudget)
      .replace("(totaldays)", days);
  
    try {
      // Generate trip response
      const result = await chatSession.sendMessage(Prompt);
      const parts = result.response.candidates[0].content.parts;
      let text = parts[0].text.trim();
      console.log(text);
      let parsedData;
  
      // Try parsing the JSON
      try {
        parsedData = JSON.parse(text);
      } catch (parseError) {
        console.warn("JSON parsing failed. Fixing the response...", parseError);
  
        // Append another closing brace if needed
        text += "}";
        try {
          parsedData = JSON.parse(text); // Attempt parsing again
          console.log("Fixed text:", text);
        } catch (fixError) {
          console.error("Parsing failed even after appending '}'.", fixError);
          alert("Failed to process the trip data. Please try again.");
          return;
        }
      }
  
      console.log("Parsed Data:", parsedData);
  
      // Save to the database
      const id = await firebase.addData(query, days, selectedBudget, selectedCompany, text);
  
      if (firebase.isLogged) {
        await firebase.updateData(id, firebase.user.email);
        navigate(`/trip-details/${id}`);
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      alert("An error occurred while generating the trip. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  
  return (
    <section className="sm:px-10 md:px-32 lg:px-52 xl:px-64 px-10 mt-12">
      <h1 className="text-2xl font-bold">Tell us your Journey Preference</h1>
      <p className="mt-4 text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        nulla ipsam magni illo inventore consequatur.
      </p>

      <div className="mt-12 flex flex-col gap-10">
        {/* Autocomplete Input */}
        <div>
          <h3 className="font-bold text-2xl">Which place do you want to go?</h3>
          <div className="relative mt-4">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Type a place..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            {suggestions.length > 0 && (
              <ul className="absolute border border-gray-300 bg-white rounded-md w-full max-h-48 overflow-y-auto mt-2 z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Days Input */}
        <div>
          <h2 className="font-bold text-2xl">
            How many days you want to stay?
          </h2>
          <input
            type="number"
            value={days}
            placeholder="Ex..5"
            className="border border-gray-300 rounded-md px-4 py-2 w-full mt-5"
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="font-bold text-2xl">What is your Budget?</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {priceCategories.map((category, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 border p-4 rounded-md cursor-pointer hover:shadow-md ${
                  selectedBudget === category.heading ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedBudget(category.heading)}
              >
                {category.icon}
                <div>
                  <h3 className="font-bold">{category.heading}</h3>
                  <p className="text-gray-600">{category.text}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedBudget && (
            <p className="mt-2 text-green-600 font-bold">
              Selected Budget: {selectedBudget}
            </p>
          )}
        </div>

        {/* Company Selection */}
        <div>
          <h2 className="font-bold my-4 text-2xl">Who is your Company?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {companyCategories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 border p-4 rounded-md cursor-pointer hover:shadow-md ${
                  selectedCompany === category.people ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedCompany(category.people)}
              >
                {category.icon}
                <div>
                  <h3 className="font-bold text-center">{category.heading}</h3>
                  <p className="text-gray-600 text-center">{category.text}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedCompany && (
            <p className="mt-2 text-green-600 font-bold">
              Selected Company: {selectedCompany}
            </p>
          )}
        </div>

        {/* Generate Trip Button */}
        <div>
          <Button onClick={generateTrip} disabled={isLoading}>
            {isLoading ? (
              <FaSpinner className="animate-spin text-white" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
