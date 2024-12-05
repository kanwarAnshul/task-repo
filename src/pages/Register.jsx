import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State for storing form data and any validation errors
  const [registerData, setRegisterData] = useState({
    full_name: "", // User's full name
    username: "", // Chosen username
    referral_id: "", // Optional referral ID
    email_id: "", // User's email address
    country_row_id: "101", // Default country ID (can be updated as needed)
    mobile_number: "", // User's mobile number
    password: "", // User's password
  });

  // State for storing validation errors for each field
  const [errors, setErrors] = useState({});

  // React router hook for navigating to different routes
  const navigate = useNavigate();

  // Function to handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    // Reset any existing error for the current field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      // Sending POST request to the registration API endpoint
      let response = await axios.post(
        process.env.REACT_APP_REGISTER_URL,
        registerData,
        {
          headers: {
            api_key: process.env.REACT_APP_API_KEY, // API key for authorization
          },
        }
      );

      // If registration is successful, display an alert and navigate to the login page
      if (response.data.status) {
        alert("Registration successful! Please login.");
        localStorage.setItem("userData", JSON.stringify(response.data.message)); // Save user data in local storage
        navigate("/login"); // Redirect to login page
      } else {
        // Display errors received from the server
        setErrors(response.data.message);
      }
    } catch (err) {
      // Display a generic error message if the request fails
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Registration form container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={registerData.full_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.full_name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
            {/* Display error message if present */}
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>
          
          {/* Username input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={registerData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
            {/* Display error message if present */}
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Referral ID input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referral ID
            </label>
            <input
              type="text"
              name="referral_id"
              placeholder="Referral ID (optional)"
              value={registerData.referral_id}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email Address input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email_id"
              placeholder="Enter your email"
              value={registerData.email_id}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.email_id ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
            {/* Display error message if present */}
            {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">{errors.email_id}</p>
            )}
          </div>

          {/* Mobile Number input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile_number"
              placeholder="Enter your mobile number"
              value={registerData.mobile_number}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.mobile_number ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
            {/* Display error message if present */}
            {errors.mobile_number && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
            )}
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={registerData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
            {/* Display error message if present */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Register
          </button>
        </form>

        {/* Link to navigate to login page */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
