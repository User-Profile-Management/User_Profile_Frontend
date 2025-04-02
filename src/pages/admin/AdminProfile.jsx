import React,{useEffect,useState} from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import ProfilePic from '../../assets/profile pic.svg'
import Edit from '../../assets/edit.svg'
import Email from '../../assets/profile-email.svg'
import Phone from '../../assets/profile-phone.svg'
import DOB from '../../assets/profile-dob.svg'
import Emergency from '../../assets/profile-emergency.svg'
import Location from '../../assets/profile-location.svg'
import userService from '../../service/userService'

export default function AdminProfile() {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await userService.getUserDetails(); 
                setAdminData(response.response); 
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };
        fetchUserDetails();
    }, []);
    

  if (!adminData) {
    return <div>Loading...</div>; 
  }
  return (
    <DashboardLayout>
         <div className='grid grid-rows-10 h-full overflow-auto'>
                <div className='flex items-center'>
                    Profile
                </div>
                <div className="row-span-9 overflow-y-auto scrollbar-hide h-full">
                    <div className="grid grid-rows-10 h-full gap-y-6">
                        <div className="row-span-4">
                            <div className='border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center'>
                                <div className="flex flex-col items-center ">
                                <img 
                                className='w-32 rounded-full' 
                                src={adminData.profilePicture 
                                ? `data:image/png;base64,${adminData.profilePicture}` 
                                : ProfilePic} 
                                alt="Profile Pic" 
                                />


                                    <div className='font-semibold text-2xl'>{adminData.fullName}</div>
                                    <div>{adminData.userId}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-6 h-auto">
                            <div className="border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5 ">
                                <div className="Personal Details flex flex-col gap-5">
                                    <div className="flex justify-between">
                                        <div className='font-semibold'>Personal Details</div>
                                        <img src={Edit} alt="edit" />
                                    </div>
                                    <div className='flex flex-col gap-y-5'>
                                        <div className="w-full flex gap-5">
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Email} alt="email-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >{adminData.email}</div>
                                                    <div className='text-sm'>Email</div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={DOB} alt="phone-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >{adminData.dateOfBirth}</div>
                                                    <div className='text-sm' >D.O.B</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-5">
                                            
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Phone} alt="phone-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >{adminData.contactNo}</div>
                                                    <div  className='text-sm'>Phone Number</div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Emergency} alt="emergency-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >{adminData.emergencyNo}</div>
                                                    <div className='text-sm' >Emergency Contact</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="border border-zinc-100"></div>
                                        <div className="">
                                        <div className="w-full flex gap-5">
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Location} alt="location-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >India</div>
                                                    <div className='text-sm' >Location</div>
                                                </div>
                                            </div>
                                        </div>
                                        </div> */}
                                        <div className="border border-zinc-100"></div>
                                    </div>
                                </div>
                                <div className="Password flex flex-col gap-y-6">
                                    <div className="title">
                                        <div className="font-semibold">Password</div>
                                        <div className="text-sm">Please enter your current password to change your password.</div>
                                    </div>
                                    <div className="form flex flex-col gap-y-4">
                                        <div className=" gap-10 items-center grid grid-cols-3">
                                            <label className='text-sm font-semibold'>Current password</label>
                                            <input
                                            className='name-input border border-zinc-100  p-2 rounded text-sm'
                                            type='text'
                                            name='Current Password'
                                            placeholder='Enter current password'
                                            />
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                        <div className="gap-10 items-center grid grid-cols-3">
                                            <label className='text-sm font-semibold'>New password</label>
                                            <div>
                                                <input
                                                className='name-input border border-zinc-100  p-2 rounded text-sm w-full'
                                                type='text'
                                                name='new password'
                                                placeholder='Enter new password'
                                                />
                                                <div className='text-sm'>Your new password must be more than 8 characters.</div>
                                            </div> 
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                        <div className="gap-10 items-center grid grid-cols-3">
                                            <label className='text-sm font-semibold'>Confirm new password</label>
                                            <div>
                                                <input
                                                className='name-input border border-zinc-100  p-2 rounded text-sm w-full '
                                                type='text'
                                                name='confirm password'
                                                placeholder='Re-Enter new password'
                                                />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="updatedetails flex flex-row-reverse gap-6">
                                        <button className='flex justify-center bg-blue-600 py-3 rounded-xl  text-white px-4 font-semibold hover:bg-blue-700 text-sm'> Update Password</button>
                                        <button className='flex justify-center bg-zinc-100 py-3 rounded-xl text-black px-4 font-semibold hover:bg-zinc-200 text-sm '> Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </DashboardLayout>
  )
}
