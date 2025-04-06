import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MentorDashboard from "../pages/mentor/MentorDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import AdminProfile from "./admin/AdminProfile";
import MentorProfile from "./mentor/MentorProfile";
import StudentProfile from "./student/StudentProfile";

const RoleBasedDashboard = () => {
  const token = localStorage.getItem("authToken");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded.roles?.[0];

    switch (role) {
      case "ADMIN":
        return <AdminDashboard />;
      case "MENTOR":
        return <MentorDashboard />;
      case "STUDENT":
        return <StudentDashboard />;
      default:
        return <div>Unauthorized role</div>;
    }
  } catch (err) {
    console.error("Error decoding token:", err);
    return <Navigate to="/" />;
  }
};
const RoleBasedProfile = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return <div>Unauthorized</div>;

  const decoded = jwtDecode(token);
  const role = decoded.roles?.[0];

  if (role === "ADMIN") return <AdminProfile />;
  if (role === "MENTOR") return <MentorProfile />;
  if (role === "STUDENT") return <StudentProfile />;

  return <div>Unauthorized role</div>;
};

export default RoleBasedDashboard;
export { RoleBasedProfile };
