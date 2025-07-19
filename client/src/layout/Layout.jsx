import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gray-800 text-white px-6 py-6 flex justify-between items-center">
        {/* Brand + Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png" // 🖼️ Use "/logo.png" if placed in public folder
            alt="Travel App Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-xl font-bold">Travel App</span>
        </NavLink>

        {/* Links */}
        <div className="space-x-4">
          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                Dashboard
              </NavLink>

              {user.role === "owner" && (
                <NavLink
                  to="/my-vehicles"
                  className={({ isActive }) =>
                    isActive ? "underline" : "hover:underline"
                  }
                >
                  My Vehicles
                </NavLink>
              )}

              {user.role === "admin" && (
                <NavLink
                  to="/revenue"
                  className={({ isActive }) =>
                    isActive ? "underline" : "hover:underline"
                  }
                >
                  Revenue
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <Outlet />
    </>
  );
}
