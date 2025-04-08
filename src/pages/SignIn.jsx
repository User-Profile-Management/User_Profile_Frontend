import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import GoogleLogo from "../assets/google.png";
import authService from "../service/authService";
import Symbol from "../assets/SignIn.svg";
import LOGO from '../assets/LOGO Black.svg'

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login(email, password);

      if (response?.response?.token) {
        const token = response.response.token;

        // ✅ Store token AFTER it's received
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        console.log("[DEBUG] Decoded Token:", decodedToken);

        const userRole = decodedToken.roles?.[0];

        if (userRole === "ADMIN") {
          console.log("Redirecting to /admin-dashboard");
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

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     console.log("User Info:", result.user);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Google Sign-In Error:", error);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
  
      const response = await authService.googleLogin(idToken); // pass token to backend
      console.log("Backend Google Login Response:", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };
  
  

  return (
    <div className='signinpage bg-white h-screen p-10 grid grid-cols-2 '>
        <div className="image bg-white rounded-2xl bg-center flex flex-col justify-center items-center gap-7">
          <img className="w-3/4 h-3/4" src={Symbol} alt="" />
        </div>

        <div className="signin px-14 flex items-center justify-center">
            <div className='border-1 border-zinc-300 px-4 py-8 rounded-2xl min-w-lg'>
                <div className="title mb-10 ">
                    <img className="w-36 mb-6" src={LOGO} alt="LOGO" />
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
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A9.004 9.004 0 0112 19c-4.418 0-8-3.582-8-8a9.001 9.001 0 0113.875-6.825M19.073 4.927a12.042 12.042 0 014.27 4.27M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 15.232a3 3 0 01-4.244-4.244M12 4.5C7.305 4.5 3.22 7.815 1.5 12c1.72 4.185 5.805 7.5 10.5 7.5s8.78-3.315 10.5-7.5C20.78 7.815 16.695 4.5 12 4.5z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-3 gap-y-4 mt-4">
                <div className="forgotpassword text-sm flex justify-between items-center">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600"
                    />
                    Remember Me
                  </label>
                  <div className="forgotpassword text-blue-600 cursor-pointer">
                    Forgot Password?
                  </div>
                </div>

                <button className="signinbutton flex justify-center bg-blue-800 py-3 rounded-xl text-white cursor-pointer font-semibold">
                  Sign in
                </button>

                <div
                  className="signinwithGoogle flex justify-center border border-zinc-100 bg-zinc-100 py-3 font-semibold rounded-xl text-black gap-2 cursor-pointer"
                  onClick={handleGoogleSignIn}
                >
                  <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />
                  Sign in with Google
                </div>

                <div className="signup flex justify-center gap-2 text-sm mt-2">
                  <div className="text-zinc-500">Don’t have an account?</div>
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center mt-2">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
