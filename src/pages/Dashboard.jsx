import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <p className="text-gray-600 mt-2">You have successfully signed in.</p>
      <Link to="/" className="mt-4 text-blue-600 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}

export default Dashboard;
