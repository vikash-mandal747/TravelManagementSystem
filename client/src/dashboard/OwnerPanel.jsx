import React  from 'react'
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OwnerPanel() {
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm());

  function initialForm() {
    return {
      model: "",
      type: "Car",
      registration_number: "",
      seat_count: 4,
      ventilation: "AC",
      farePerKm: 10,
    };
  }

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicle/my-vehicles");
      setVehicles(res.data.data || []);
    } catch (err) {
      console.error("Error fetching vehicles", err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(initialForm());
    setModalOpen(true);
  };

  const openEdit = (v) => {
    setEditing(v);
    setForm({
      model: v.model,
      type: v.type,
      registration_number: v.registration_number,
      seat_count: v.seat_count,
      ventilation: v.ventilation,
      farePerKm: v.farePerKm,
    });
    setModalOpen(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/vehicle/update-vehicle/${editing._id}`, form);
      } else {
        await api.post("/vehicle/add-vehicle", form);
      }
      setModalOpen(false);
      fetchVehicles();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    try {
      await api.delete(`/vehicle/delete-vehicle/${id}`);
      fetchVehicles();
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <div className="p-6">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">My Vehicles</h1>
        <button
          onClick={openAdd}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          + Add Vehicle
        </button>
      </div>

      {/* vehicle list */}
      <ul className="space-y-3">
        {vehicles.map((v) => (
          <li
            key={v._id}
            className="bg-white/90 backdrop-blur border rounded-xl p-4 flex justify-between items-center shadow-sm"
          >
            <span className="font-medium">
              {v.model} • {v.registration_number} •{" "}
              {v.isAvailable ? "Available" : "Busy"}
            </span>

            <div className="space-x-2 text-sm">
              <button
                onClick={() => openEdit(v)}
                className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(v._id)}
                className="px-3 py-1 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {!vehicles.length && (
          <p className="text-gray-500 text-sm">No vehicles added.</p>
        )}
      </ul>

      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-1">
              {editing ? "Edit Vehicle" : "Add Vehicle"}
            </h2>

            {/* inputs */}
            {[
              { name: "model", label: "Model" },
              { name: "registration_number", label: "Registration No." },
              {
                name: "seat_count",
                label: "Seat Count",
                type: "number",
                min: 4,
                max: 56,
              },
              {
                name: "farePerKm",
                label: "Fare per Km (₹)",
                type: "number",
                min: 1,
              },
            ].map((f) => (
              <input
                key={f.name}
                {...f}
                placeholder={f.label}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={form[f.name]}
                onChange={handleChange}
                required
              />
            ))}

            <select
              name="type"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.type}
              onChange={handleChange}
            >
              {["Car", "Jeep", "Bus", "MiniBus"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select
              name="ventilation"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.ventilation}
              onChange={handleChange}
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non‑AC</option>
            </select>

            {/* actions */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-1 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition"
              >
                {editing ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
