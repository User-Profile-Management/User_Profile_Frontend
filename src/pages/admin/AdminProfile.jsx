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
import EditProfileModal from '../../components/modals/EditProfileModal'

export default function AdminProfile() {
    const [adminData, setAdminData] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      
    const handleChange = (e) =>{
        setPasswordData({...passwordData, [e.target.name]: e.target.value});
    }
    const [isEditModalOpen, setIsEditModalOpen]= useState(false);
    const handleEditClick = ()=>{
        setIsEditModalOpen(true);
    };
    const handleCloseModal = () =>{
        setIsEditModalOpen(false);
    };
      

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const { currentPassword, newPassword, confirmNewPassword } = passwordData;
      
        if (!currentPassword || !newPassword || !confirmNewPassword) {
          alert("Please fill all the fields.");
          return;
        }
      
        if (newPassword.length < 8) {
          alert("New password must be at least 8 characters.");
          return;
        }
      
        if (newPassword !== confirmNewPassword) {
          alert("New password and confirm password do not match.");
          return;
        }
      
        try {
          await userService.updatePassword({ currentPassword, newPassword });
          alert("Password updated successfully!");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          });
        } catch (error) {
          console.error("Password update error:", error);
          alert("Failed to update password. Please try again.");
        }
      };
      const handleProfileSave = async (updatedData) => {
        try {
            const formData = new FormData();
            formData.append("address", updatedData.address);
            formData.append("contactNo", updatedData.phone);
            formData.append("emergencyContact", updatedData.emergencyContact);
    
            if (updatedData.profilePicture) {
                formData.append("profilePicture", updatedData.profilePicture);
            }
    
            await userService.updateProfile(formData); 
            alert("Profile updated successfully!");
    
            
            const refreshedData = await userService.getUserDetails();
            setAdminData(refreshedData.response);
    
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };
    
    


    
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
                                className='w-32 h-32 rounded-full ' 
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
                                        <button onClick={handleEditClick}>
                                        <img src={Edit} alt="edit" />
                                        </button>
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
                                                    <div className="font-semibold" >{adminData.emergencyContact}</div>
                                                    <div className='text-sm' >Emergency Contact</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                        <div className="">
                                        <div className="w-full flex gap-5">
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Location} alt="location-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >{adminData.address}</div>
                                                    <div className='text-sm' >Address</div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="Password flex flex-col gap-y-6">
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
                                            name='currentPassword'
                                            value={passwordData.currentPassword}
                                            onChange={handleChange}
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
                                                name='newPassword'
                                                value={passwordData.newPassword}
                                                onChange={handleChange}
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
                                                name='confirmNewPassword'
                                                value={passwordData.confirmNewPassword}
                                                onChange={handleChange}
                                                placeholder='Re-Enter new password'
                                                />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="updatedetails flex flex-row-reverse gap-6">
                                        <button type="submit" className='flex justify-center bg-blue-600 py-3 rounded-xl  text-white px-4 font-semibold hover:bg-blue-700 text-sm'>
                                             Update Password</button>

                                        <button 
                                        type="button"
                                        onClick={() => setPasswordData({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmNewPassword:""

                                        }   
                                        )}
                                        className='flex justify-center bg-zinc-100 py-3 rounded-xl text-black px-4 font-semibold hover:bg-zinc-200 text-sm '>
                                        Cancel</button>

                                             
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditProfileModal
  isOpen={isEditModalOpen}
  onClose={handleCloseModal}
  onSave={handleProfileSave}
  userData={adminData}
/>

    </DashboardLayout>
  )
}
