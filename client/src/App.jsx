import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyVehicles from "./pages/MyVehicles";   // owner page (placeholder)
import Revenue from "./pages/Revenue";         // admin page (placeholder)
import PrivateRoute from "./auth/PrivateRoute"; // same helper as before

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages that shouldn’t show the nav bar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Everything below gets the nav bar */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-vehicles"
              element={
                <PrivateRoute allowed={["owner"]}>
                  <MyVehicles />
                </PrivateRoute>
              }
            />
            <Route
              path="/revenue"
              element={
                <PrivateRoute allowed={["admin"]}>
                  <Revenue />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
