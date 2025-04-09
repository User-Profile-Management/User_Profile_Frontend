import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp1 from "../pages/SignUp1";
import SignUp2 from "../pages/SignUp2";
import ProtectedRoute from "../components/ProtectedRoute";
import RequestApproval from "../pages/admin/RequestApproval";
import AdminViewStudent from "../pages/admin/AdminViewStudent";
import AdminViewMentor from "../pages/admin/AdminViewMentor";
import MentorViewStudent from "../pages/mentor/MentorViewStudent";

import AcceptApproval from "../pages/admin/AcceptApproval";


import RoleBasedDashboard, {
  RoleBasedProfile,
} from "../pages/RoleBasedDashboard";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp1 />} />
      <Route path="/signup2" element={<SignUp2 />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<RoleBasedDashboard />} />
        <Route path="/profile" element={<RoleBasedProfile />} />

        {/* Admin */}

        <Route path="/admin-approval" element={<RequestApproval />} />
        <Route path="/admin-student-profile/:userId" element={<AdminViewStudent />} />

        <Route path="/admin-mentor-profile/:userId" element={<AdminViewMentor />} />
        <Route path="/admin-accept/:userId" element={<AcceptApproval />} />

        {/* Mentor */}

        <Route path="/mentor-student-profile/:userId" element={<MentorViewStudent />} />

        {/* Student */}

        
      </Route>
    </Routes>
  );
}

export default Router;
