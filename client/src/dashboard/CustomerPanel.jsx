import React, { useEffect, useState } from "react";
import api from "../api/axios";

const AVAILABLE_URL = "/vehicle/available";

const initialForm = () => ({
  from: "",
  to: "",
  totalDistance: "",
  noOfPassengers: 1,
  startDate: "",
  endDate: "",
  vehicle: "",
});

export default function CustomerPanel() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehError, setVehError] = useState("");
  const [loadingVeh, setLoadingVeh] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/trips/my");
        setTrips(res.data.data || []);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(AVAILABLE_URL);
        setVehicles(res.data.data || []);
      } catch (err) {
        setVehError(err.message || "Unable to load vehicles");
      } finally {
        setLoadingVeh(false);
      }
    })();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openModal = () => {
    setForm(initialForm());
    setShowForm(true);
  };

  const createTrip = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/trips/create-trip", {
        ...form,
        totalDistance: Number(form.totalDistance),
        noOfPassengers: Number(form.noOfPassengers),
      });
      setTrips((prev) => [...prev, res.data.data]);
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.Error || "Booking failed");
    }
  };

  const cancelTrip = async (id) => {
    if (!window.confirm("Cancel this trip?")) return;
    try {
      await api.delete(`/trips/${id}`);
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch {
      alert("Cancel failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
        <button
          onClick={openModal}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
        >
          + Create Trip
        </button>
      </div>

      {/* trip list */}
      <ul className="space-y-4">
        {trips.map((t) => {
          const status = t.isCompleted
            ? ["Completed", "bg-green-100 text-green-700"]
            : t.isStarted
            ? ["In Progress", "bg-yellow-100 text-yellow-700"]
            : ["Scheduled", "bg-blue-100 text-blue-700"];
          return (
            <li
              key={t._id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-center shadow hover:shadow-md transition"
            >
              <span className="text-gray-700 font-medium">
                {t.from} → {t.to} •{" "}
                {t.totalFare ? `₹${t.totalFare}` : "Pending"}
              </span>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${status[1]}`}
                >
                  {status[0]}
                </span>

                {!t.isStarted && (
                  <button
                    onClick={() => cancelTrip(t._id)}
                    className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          );
        })}
        {!trips.length && (
          <p className="text-gray-500 text-center italic mt-4">No trips yet.</p>
        )}
      </ul>

      {/* modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={createTrip}
            className="bg-white rounded-xl p-8 w-full max-w-lg shadow-xl space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Book a Trip
            </h2>

            {[{ label: "From", name: "from" },
              { label: "To", name: "to" },
              { label: "Distance (km)", name: "totalDistance", type: "number" },
              { label: "Passengers", name: "noOfPassengers", type: "number", min: 1 }
            ].map((f) => (
              <input
                key={f.name}
                {...f}
                placeholder={f.label}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={form[f.name]}
                onChange={handleChange}
                required
              />
            ))}

            <input
              type="date"
              name="startDate"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="endDate"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={form.endDate}
              onChange={handleChange}
              required
            />

            <select
              name="vehicle"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={form.vehicle}
              onChange={handleChange}
              required
              disabled={loadingVeh || !!vehError}
            >
              <option value="" disabled hidden>
                {loadingVeh
                  ? "Loading vehicles..."
                  : vehError || "Select Vehicle"}
              </option>
              {vehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.model} ({v.seat_count} seats)
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow disabled:opacity-50"
                disabled={!vehicles.length || !!vehError}
              >
                Book
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
