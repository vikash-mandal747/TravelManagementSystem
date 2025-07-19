import React  from 'react'
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function DriverPanel() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ─── STEP 2: load assigned trips ─── */
  const loadTrips = async () => {
    try {
      const res = await api.get("/trips/assigned"); // <- backend route
      setTrips(res.data.data || []);
    } catch (err) {
      console.error("Error fetching trips", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  /* ─── STEP 4: start / end helper ─── */
  const startOrEndTrip = async (tripId, action) => {
    try {
      await api.patch(`/trips/${action}-trip/${tripId}`);
      loadTrips(); // refresh list
    } catch {
      alert("Failed to update trip");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Assigned Trips</h1>

      {loading && <p className="text-gray-500 text-sm">Loading…</p>}

      {!loading && (
        <ul className="space-y-3">
          {trips.map((t) => (
            /* ─── STEP 3: list with Start / End buttons ─── */
            <li
              key={t._id}
              className="bg-white/90 backdrop-blur border rounded-xl p-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <span className="font-medium">
                  {t.from} → {t.to}
                </span>
                <div className="text-xs text-gray-500">
                  Vehicle&nbsp;• {t.vehicle?.model || "—"}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {!t.isStarted && (
                  <button
                    onClick={() => startOrEndTrip(t._id, "start")}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                  >
                    Start
                  </button>
                )}

                {t.isStarted && !t.isCompleted && (
                  <button
                    onClick={() => startOrEndTrip(t._id, "end")}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                  >
                    End
                  </button>
                )}

                {t.isCompleted && (
                  <span className="text-xs text-gray-400">Completed</span>
                )}
              </div>
            </li>
          ))}

          {!trips.length && !loading && (
            <p className="text-gray-500 text-sm">
              No trips assigned to you at the moment.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}
