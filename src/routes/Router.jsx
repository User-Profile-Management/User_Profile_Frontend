import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Signup1 from '../pages/Signup1'; // Import Signup1

function Router() {
  return (
   <Routes>
       <Route path="/" element={<SignIn />} />
       <Route path="/signup" element={<Signup1 />} /> {/* Add Signup Route */}
   </Routes>
  );
}

export default Router;
