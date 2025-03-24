import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Signup1 from "../pages/Signup1";
import Dashboard from "../pages/Dashboard.jsx"; // Import Dashboard

function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<Signup1 />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard Route */}
    </Routes>
  );
}

export default Router;
