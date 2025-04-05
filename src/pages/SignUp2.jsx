import React, { useState } from "react";
import { Link ,useNavigate, useLocation} from "react-router-dom";

import BackgroundImage from "/src/assets/frontimage.png";
import userService from "../service/userService";


function SignUp2() {
    const location = useLocation();
    const initialData = location.state || {};
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: initialData.fullName,
        contactNo: initialData.contactNo,
        address: initialData.address,
        dateOfBirth: initialData.dateOfBirth,
        email: "",
        password: "",
        roleName: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (formData.password !== formData.confirmedpassword) {
    //         setError("Passwords do not match!");
    //         return;
    //     }
    //     const { confirmedpassword, ...userData } = formData;
        
    //     try {
    //         console.log("form submitted");
    //         const response = await userService.signup(userData);
    //         console.log("API Response:", response);
          
    //         if(response.status===200)
    //             alert("Registration successful! Redirecting to Sign In...");
    //         navigate("/");
    //     } catch (err) {
    //         setError(err.response?.data?.message || "An error occurred");
    //     }
    // };


    const handleSubmit = async (e) => {
        console.log("handleSubmit function executed!");  
        e.preventDefault();
    
        if (formData.password !== formData.confirmedpassword) {
            setError("Passwords do not match!");
            console.log(" Passwords do not match!");
            return;
        }
        console.log(" Passwords match, proceeding...");
    
        const { confirmedpassword, ...userData } = formData;
        console.log(" Sending data:", userData);
    
        try {
            const response = await userService.signup(userData);
            console.log("API Response:", response);
    
            if (response.statusCode === 200) {
               
                console.log("Navigating to '/' page...");
            navigate("/");
            }
        } catch (err) {
            console.error("Signup Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "An error occurred");
        }
    };
    
    
        const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className='signup page bg-white h-screen p-10 grid grid-cols-2'>
           <div
                className="image bg-zinc-300 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                >
            </div>
            <div className="signup px-14 flex items-center justify-center ">
                <div className='border-1 border-zinc-300 px-4 py-8 rounded-2xl min-w-lg'>
                    <div className="title mb-10">
                        <div className="heading text-4xl">Hi</div>
                        <div className="subheading text-md text-zinc-400">Enter your details to register.</div>
                    </div>
                    <div className="signup form ">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-y-3 mb-10">

                                <div className="email flex flex-col gap-y-1">
                                    <label>Email</label>
                                    <input
                                        className='email-input border border-zinc-100 bg-gray-100 p-2 rounded text-sm'
                                        type='text'
                                        name='email'
                                        placeholder='Enter your email address'
                                        value={formData.email}
                                        onChange={handleChange}
                                        />
                                </div>
                                <div className="password flex flex-col gap-y-1 relative">
                                <label>Password</label>
                                    <div className="relative">
                                        <input
                                        className="border border-zinc-100 bg-zinc-100 p-2 rounded text-sm w-full pr-10"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        />
                                    
                                        <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                                        >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.004 9.004 0 0112 19c-4.418 0-8-3.582-8-8a9.001 9.001 0 0113.875-6.825M19.073 4.927a12.042 12.042 0 014.27 4.27M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 15.232a3 3 0 01-4.244-4.244M12 4.5C7.305 4.5 3.22 7.815 1.5 12c1.72 4.185 5.805 7.5 10.5 7.5s8.78-3.315 10.5-7.5C20.78 7.815 16.695 4.5 12 4.5z" />
                                            </svg>
                                        )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label>Confirm Password</label>
                                    <input
                                        className='email-input border border-zinc-100 bg-gray-100 p-2 rounded text-sm'
                                        type='text'
                                        name='confirmedpassword'
                                        placeholder='Re enter the password '
                                        value={formData.confirmedpassword}
                                        onChange={handleChange}
                                        />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <label>Role</label>
                                    <select
                                    className="role-input  border border-zinc-100 bg-gray-100 p-2 rounded text-sm"
                                    name="roleName"
                                    value={formData.roleName}
                                    onChange={handleChange}
                                    >
                                    <option >Select Role</option>
                                    <option value="STUDENT">STUDENT</option>
                                    <option value="MENTOR">MENTOR</option>
                                    <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                            </div>




                            <div className="grid grid-rows-1 gap-y-4">
                            <button 
                                type="submit" 
                                className="flex justify-center bg-blue-800 py-3 rounded-xl text-white font-semibold w-full"
                                >
                                Sign Up
                                </button>
                                
                            
                        
                            

                            <div className="signup flex justify-center gap-2 text-sm">
                                <div className="text-zinc-500">Already have an account?</div>
                                    <Link to="/" className="text-blue-600 hover:underline">
                                    Sign In
                                    </Link>
                                </div>
                            </div> 

                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default SignUp2