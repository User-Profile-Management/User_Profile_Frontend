
import React, { useState ,useEffect} from "react";
import ErrorModal from "../components/modals/ErrorModal.jsx";
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import GoogleLogo from "../assets/google.png";
import authService from "../service/authService";
import BackgroundImage from "/src/assets/frontimage.png";



function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Modal visibility state changed:", showErrorModal);
  }, [showErrorModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setError("");       
  
    try {
      const response = await authService.login(email, password);   
      
      if (response?.response?.token) {
        const decodedToken = jwtDecode(response.response.token); 
        localStorage.setItem("authToken", response.response.token);

        console.log("[DEBUG] Decoded Token:", decodedToken);
  
        const userRole = decodedToken.roles?.[0]; 
  
        if (userRole === "ADMIN") {
          console.log("Redirecting to /dashboard");
          navigate("/dashboard");
        } else if (userRole === "MENTOR") {
          console.log("Redirecting to /mentor-dashboard");
          navigate("/dashboard");
        } else if (userRole === "STUDENT") {
          console.log("Redirecting to /student-dashboard");
          navigate("/dashboard");
        } else {
          console.error("Unauthorized role:", userRole);
          setError("Unauthorized role");
        }
      } else {
        setError("Login failed as token is missing.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };
  
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const userEmail = result.user.email;
  
      const backendResponse = await fetch("http://localhost:8080/api/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Google-ID-Token": idToken,
        },
        body: JSON.stringify({ email: userEmail }),
      });
  
      const data = await backendResponse.json();
  
      if (!backendResponse.ok) {
        if (backendResponse.status === 401) {
          console.log("User not found in the database, showing error modal");
          setError("User does not exist in the database.");
          setShowErrorModal(true);  // Trigger the modal to show
          return;
        }
        throw new Error(data?.message || "Google login failed");
      }
  
      const token = data?.response?.token;
      if (!token) throw new Error("No token received");
  
      localStorage.setItem("authToken", token);
      
      const decodedToken = jwtDecode(token);
      console.log("Google auth decoded token:", decodedToken);
  
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error.message || "Google login failed");
      setShowErrorModal(true);  // Ensure this triggers the modal properly
    }
  };
  
  return (
    <div className='signinpage bg-white h-screen p-10 grid grid-cols-2'>
       <div
  className="image bg-zinc-300 rounded-2xl bg-cover bg-center"
  style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
>
</div>

        <div className="signin px-14 flex items-center justify-center">
            <div className='border-1 border-zinc-300 px-4 py-8 rounded-2xl min-w-lg'>
                <div className="title mb-10">
                    <div className="heading text-4xl font-semibold">Welcome Back</div>
                    <div className="subheading text-md  text-zinc-400">Enter your credentials to access your account</div>
                </div>
                <div className="credentials ">
                    <form onSubmit={handleSubmit}>
                        <div className="form-signin flex flex-col gap-y-3">
                            <div className="email flex flex-col gap-y-1">
                                <label>Email</label>
                                <input
                                    className='email-input border border-zinc-100 bg-zinc-100 p-2 rounded text-sm'
                                    type='text'
                                    name='email'
                                    placeholder='Enter your Email address'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
              </div>

                        <div  className='grid grid-rows-3 gap-y-4'>
                                    <div className="forgotpassword text-sm flex justify-between items-center">
                                        <label className="flex items-center gap-1 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                                            Remember Me
                                        </label>
                                        <div 
                                            className="forgotpassword text-blue-600 cursor-pointer"
                                            onClick={() => navigate("/forgot-password")}
                                        >
                                            Forgot Password?
                                        </div>

                                        </div>

                            <button className="signinbutton flex justify-center bg-blue-800 py-3 rounded-xl text-white cursor-pointer font-semibold" >
                        
                                    Sign in 
                                
                            </button>
                            <div 
                                className="signinwithGoogle flex justify-center border border-zinc-100 bg-zinc-100 py-3 font-semibold rounded-xl text-black gap-2 cursor-pointer"
                                onClick={handleGoogleSignIn}
                            >
                                <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />
                                Sign in with Google
                            </div>



                            <div className="signup flex justify-center gap-2 text-sm">
                                <div className='text-zinc-500'>Dont have an account?</div>
                                <Link to="/signup" className="text-blue-600 hover:underline">
                                        Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        

       
    {showErrorModal && (
      <ErrorModal
        isOpen={showErrorModal}  // Pass the correct state to the modal
        onClose={() => setShowErrorModal(false)}  // Ensure modal closes when "OK" is clicked
      />
    )}
  </div>
    
  )
}

export default SignIn