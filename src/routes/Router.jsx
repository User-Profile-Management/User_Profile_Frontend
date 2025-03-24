
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp1 from '../pages/SignUp1'
import SignUp2 from '../pages/SignUp2'

function Router() {
  return (
   <Routes>

       <Route path="/" element= {<SignIn/>} />
       <Route path="/signup" element= {<SignUp1/>} />
       <Route path="/signup2" element= {<SignUp2/>} />
   </Routes>
  );
}

export default Router;
