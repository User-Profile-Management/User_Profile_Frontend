
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp1 from '../pages/SignUp1'
import SignUp2 from '../pages/SignUp2'
import AdminDashboard from '../pages/admin/AdminDashboard'
import StudentDashboard from '../pages/student/StudentDashboard'
import MentorDashboard from '../pages/mentor/MentorDashboard'
import AdminProfile from '../pages/admin/AdminProfile'
import MentorProfile from '../pages/mentor/MentorProfile'
import StudentProfile from '../pages/student/StudentProfile'
import RequestApproval from '../pages/admin/RequestApproval'
import AdminViewStudent from '../pages/admin/AdminViewStudent'
import AdminViewMentor from '../pages/admin/AdminViewMentor'
import MentorViewStudent from '../pages/mentor/MentorViewStudent'


function Router() {
  return (
   <Routes>

       <Route path="/" element= {<SignIn/>} />
       <Route path="/signup" element= {<SignUp1/>} />
       <Route path="/signup2" element= {<SignUp2/>} />
       

       {/* Admin */}
       <Route path="/admin-dashboard" element={<AdminDashboard />} />
       <Route path="/admin-profile" element={<AdminProfile />} />
       <Route path="/admin-approval" element={<RequestApproval />} />
       <Route path="/admin-student-profile" element={<AdminViewStudent />} />
       <Route path="/admin-mentor-profile" element={<AdminViewMentor />} />


       {/* Mentor */}
       <Route path="/mentor-dashboard" element={<MentorDashboard />} />
       <Route path="/mentor-profile" element={<MentorProfile  />} />
       <Route path="/mentor-student-profile" element={<MentorViewStudent />} />


       {/* Student */}
       <Route path="/student-dashboard" element={<StudentDashboard />} />
       <Route path="/student-profile" element={<StudentProfile />} />

       


   </Routes>
  );
}

export default Router;
