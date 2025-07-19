import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminPanel() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/admin/monthly-revenue", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res?.data?.message;

        // Convert month number to month name
        const formatted = Array.isArray(data)
          ? data.map((item) => ({
              ...item,
              month: [
                "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
              ][item._id],
            }))
          : [];

        setMonthlyRevenue(formatted);
      } catch (err) {
        console.error("Failed to load monthly revenue", err);
        setMonthlyRevenue([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">📊 Monthly Revenue Chart</h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse text-center">Loading revenue data...</p>
      ) : monthlyRevenue.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
            <Bar dataKey="totalRevenue" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 italic text-center">No revenue data available.</p>
      )}
    </div>
  );
}
