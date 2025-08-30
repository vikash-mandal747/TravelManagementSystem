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
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("revenue"); // 'revenue' or 'vehicles'

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (view === "revenue") {
      fetchMonthlyRevenue();
    } else {
      fetchAllVehicles();
    }
  }, [view]);

  const fetchMonthlyRevenue = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/admin/monthly-revenue", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.message;

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

  const fetchAllVehicles = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/vehicle/my-vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data;
      console.log("Fetched vehicles:", data); // 👈 Debugging line
      // ✅ Ensure data is an array before using
      setVehicles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-8 max-w-6xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Admin Dashboard</h1>

      {/* View Switch Buttons */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setView("revenue")}
          className={`px-4 py-2 rounded-lg font-semibold ${view === "revenue"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          View Revenue
        </button>
        <button
          onClick={() => setView("vehicles")}
          className={`px-4 py-2 rounded-lg font-semibold ${view === "vehicles"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          View All Vehicles
        </button>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <p className="text-gray-500 animate-pulse text-center">Loading...</p>
      ) : view === "revenue" ? (
        monthlyRevenue.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              📊 Monthly Revenue Chart
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
                <Bar dataKey="totalRevenue" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p className="text-gray-500 italic text-center">No revenue data available.</p>
        )
      ) : vehicles.length > 0 ? (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            🚗 All Vehicles
          </h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Vehicle Name</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Owner</th>
                <th className="py-2 px-4 text-left">Seats</th>
                <th className="py-2 px-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v, index) => (
                <tr key={v._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{v.name || "N/A"}</td>
                  <td className="py-2 px-4">{v.type || "N/A"}</td>
                  <td className="py-2 px-4">{v.owner?.name || "N/A"}</td>
                  <td className="py-2 px-4">{v.seats || "N/A"}</td>
                  <td className="py-2 px-4">₹{v.price || "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No vehicles found.</p>
      )}
    </div>
  );
}
