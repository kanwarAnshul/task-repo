import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // State to hold user data retrieved from localStorage
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // useEffect hook to retrieve user data from localStorage and set it in state
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        // Parsing JSON data from localStorage and setting it in the state
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        // Logging an error if JSON parsing fails
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      // Redirecting to the login page if no user data is found
      navigate('/login');
    }
  }, [navigate]);

  // Rendering a message if user data is not available (e.g., if not logged in)
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-600 font-semibold">Unauthorized. Please log in.</p>
      </div>
    );
  }

  // Array containing user fields to be displayed in a table format
  const userFields = [
    { label: 'Full Name', value: userData.full_name },
    { label: 'Username', value: userData.username },
    { label: 'Country ID', value: userData.country_row_id },
    { label: 'Email ID', value: userData.email_id },
    { label: 'Mobile Number', value: userData.mobile_number },
    { label: 'Referral ID', value: userData.referral_id }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              {/* Table header */}
              {['Field', 'Value'].map((header, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Mapping through userFields to display data in rows */}
            {userFields.map((field, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">{field.label}</td>
                <td className="border border-gray-300 px-4 py-2">{field.value || 'No Data'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-6">
          {/* Log out button */}
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300"
            onClick={() => {
              // Removing user data from localStorage and navigating to login page
              localStorage.removeItem('userData');
              navigate('/login');
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
