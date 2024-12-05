import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to store login credentials and error message
  const [loginData, setLoginData] = useState({ login_id: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handler for input changes to update the state
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setLoginData((prev) => ({ ...prev, [name]: value })); // Update state with new values
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setError(''); // Clear any previous error message
    try {
      // Sending a POST request to login API endpoint
      const response = await axios.post(process.env.REACT_APP_LOGIN_URL, loginData, {
        headers: {
          api_key: process.env.REACT_APP_API_KEY, // Pass the API key in the request headers
        },
      });

      // Check if the response status is 200 and contains successful login data
      if (response.status === 200 && response.data.status) {
        navigate('/home'); // Navigate to the home page on successful login
      } else {
        // Display alert message from the API response or default to 'Invalid login credentials!'
        const alertMessage = response.data.message.alert_message || 'Invalid login credentials!';
        setError(alertMessage); // Set the error state
      }
    } catch (err) {
      // Catch any error that occurs during the request
      setError('An error occurred while processing your request.'); // Set a generic error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      {/* Container for the login form */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input field for email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="login_id"
              placeholder="Enter your email"
              value={loginData.login_id}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required // Ensure the field is filled out before submission
            />
          </div>
          {/* Input field for password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required // Ensure the field is filled out before submission
            />
          </div>
          {/* Display error message if any */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Login
          </button>
        </form>
        {/* Link to navigate to the registration page */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/')} // Navigate to the registration page on click
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
