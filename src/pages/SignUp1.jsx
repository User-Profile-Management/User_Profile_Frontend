import React from 'react'
import BackgroundImage from "/src/assets/frontimage.png";

function SignUp1() {
    return (
        <div className='signuppage bg-white h-screen p-10 grid grid-cols-2'>
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
                        <form>
                            <div className="form-signup flex flex-col gap-y-3 mb-10">
                                <div className="email flex flex-col gap-y-1">
                                    <label>Name</label>
                                    <input
                                        className='name-input border border-zinc-100 bg-gray-100 p-2 rounded text-sm'
                                        type='text'
                                        name='name'
                                        placeholder='Enter your full name'
                                        />
                                </div>
                                <div className="dob flex flex-col gap-y-1">
                                    <label>Date Of Birth</label>
                                    <input
                                        className='dob-input border border-zinc-100 bg-zinc-100 p-2 rounded text-sm'
                                        type='date'
                                        name='date'
                                        placeholder='Enter your DOB'
                                        />
                                </div>
                                <div className="contact flex flex-col gap-y-1">
                                    <label>Contact Number</label>
                                    <input
                                        className='contact-input border border-zinc-100 bg-gray-100 p-2 rounded text-sm'
                                        type='text'
                                        name='contact'
                                        placeholder='Enter your mobile number'
                                        />
                                </div>
                                <div className="address flex flex-col gap-y-1">
                                    <label>Address</label>
                                    <input
                                        className='address-input border border-zinc-100 bg-gray-100 p-2 rounded text-sm'
                                        type='text'
                                        name='address'
                                        placeholder='Enter your address'
                                        />
                                </div>
                            </div>
                            <div  className='grid grid-rows-1 gap-y-4'>
                                <div className="signupbutton flex justify-center bg-blue-800 py-3 rounded text-white">
                                    <button className=''>
                                        Next
                                    </button>
                                </div>
                                <div className="signup flex justify-center gap-2 text-sm">
                                    <div className='text-zinc-500'>Already have an account?</div>
                                    <div>Sign in</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default SignUp1