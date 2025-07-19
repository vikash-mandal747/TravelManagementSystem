import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Revenue() {
  const [revenue, setRevenue] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/admin/get-revenue", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRevenue(res.data.revenue);
      } catch (err) {
        setError("Failed to fetch revenue");
      }
    };
    fetchRevenue();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Revenue Overview</h1>

      {error ? (
        <p className="text-red-600 text-center font-medium">{error}</p>
      ) : revenue !== null ? (
        <div className="text-center">
          <p className="text-xl text-gray-700 font-semibold mb-2">Total Revenue</p>
          <p className="text-4xl font-bold text-green-600">
            ₹ {revenue.toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-center animate-pulse">Loading revenue data...</p>
      )}
    </div>
  );
}
