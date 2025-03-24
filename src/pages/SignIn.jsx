import React from 'react'
import GoogleLogo from "../assets/google.png";
import BackgroundImage from "/src/assets/frontimage.png";



function SignIn() {
  return (
    <div className='signinpage bg-white h-screen p-10 grid grid-cols-2'>
       <div
            className="image bg-zinc-300 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
            >
        </div>
        <div className="signin px-14 flex items-center justify-center ">
            <div className='border-1 border-zinc-300 px-4 py-8 rounded-2xl min-w-lg'>
                <div className="title mb-10">
                    <div className="heading text-4xl">Welcome Back</div>
                    <div className="subheading text-sm text-zinc-400">Enter your credentials to access your account</div>
                </div>
                <div className="credentials ">
                    <form>
                        <div className="form-signin flex flex-col gap-y-3">
                            <div className="email flex flex-col gap-y-1">
                                <label>Email Address</label>
                                <input
                                    className='email-input border border-zinc-200 p-2 rounded text-sm'
                                    type='text'
                                    // id='email'
                                    name='email'
                                    placeholder='Enter Email Address'
                                    />
                            </div>
                            <div className="password flex flex-col gap-y-1">
                                <label>Password</label>
                                <input
                                    className='email-input border border-zinc-200 p-2 rounded text-sm'
                                    type='password'
                                    // id='email'
                                    name='password'
                                    placeholder='Enter Password'
                                    />
                            </div>
                        </div>
                        <div  className='grid grid-rows-3 gap-y-4'>
                            <div className="forgotpassword text-sm flex justify-between">
                                <div className="remember">Remember Me</div>
                                <div className="forgotpassword">Forgot Password?</div>
                            </div>
                            <div className="signinbutton flex justify-center bg-blue-800 py-3 rounded text-white">
                                <button className=''>
                                    Sign in 
                                </button>
                            </div>
                            <div className="signinwithGoogle flex justify-center border border-zinc-300 py-3 rounded text-black gap-2">
                            <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />

                                <button className=''>
                                    Sign in with Google
                                </button>
                            </div>
                            <div className="signup flex justify-center gap-2 text-sm">
                                <div className='text-zinc-500'>Dont have an account?</div>
                                <div>Sign up</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignIn