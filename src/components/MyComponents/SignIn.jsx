import { useFirebase } from "@/context/firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  // State variables for inputs and error handling
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate and handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Check if fields are filled
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    firebase
      .Signin(email, password)
      .then(() => {
        if (firebase.isFormCompleted) {
          console.log(firebase.email);
          firebase.updateData(firebase.id);
          navigate(`/trip-details/${firebase.id}`);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-500 text-center mb-6">
          AI Trip Planner - Sign In
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-center items-center my-4">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="px-2 text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>
        <button
          className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border hover:bg-gray-200 transition"
          onClick={() => {
            firebase
              .GoogleSignin()
              .then(() => {
                if (firebase.isFormCompleted) {
                  console.log(firebase.email);
                  firebase.updateData(firebase.id);
                  navigate(`/trip-details/${firebase.id}`);
                } else {
                  navigate("/");
                }
              })
              .catch((error) =>
                setError(error.message || "Google Sign-In failed.")
              );
          }}
        >
          <img
            src="/google-removebg-preview.png"
            alt="Google"
            className="w-8 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
