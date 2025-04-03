import React,{useState,useEffect}from 'react'
import DashboardLayout from '../../layout/DashboardLayout.jsx'
import userService from '../../service/userService.jsx';
import Profile from '../../assets/profile.svg'
import { Link } from 'react-router-dom';

function RequestApproval() {
    const [searchQuery, setSearchQuery] = useState('');
    const [approvals, setApprovalList] = useState([]); // Initialize state

    useEffect(() => {
        const fetchApprovalList = async () => {
          try {
            const fetchedApprovals = await userService.getApprovalList();
            setApprovalList(fetchedApprovals);
          } catch (error) {
            console.error("Approval list error:", error);
            setApprovalList([]); // Handle error by setting an empty list
          }
        };
        fetchApprovalList();
      }, []);

    const filteredApprovals = approvals.filter(
        (approval) =>
          approval.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          approval.admissionNo.includes(searchQuery)
    );

    return (
        <DashboardLayout>
             <div className="grid grid-rows-10 h-full">
                <div className='flex items-center'> 
                    Requests for Approval
                </div>
                <div className="row-span-9 h-full ">
                    <div className="grid grid-rows-11 h-full">
                        <div className='flex justify-between items-center p-4'>
                        <div className="text-2xl font-semibold">Approval List</div>
                        
                        </div>
                        <div className='grid grid-cols-4 items-center px-10 bg-zinc-100 justify-between'>
                            <div className=''>Sl No </div>
                            <div>Name</div>
                            <div className='text-center'>User ID</div>
                            <div className='text-center'>Action</div>
                        </div>
                        <div className="row-span-8 overflow-y-auto scrollbar-hide h-full">

                        {filteredApprovals.length > 0 ? (
                                filteredApprovals.map((approval, index) => (
                                <div key={approval.userId} className="grid grid-cols-4 gap-4 items-center bg-white p-3 px-10 border-b border-gray-200 hover:bg-gray-50">
                                    <div className=''>{index + 1}</div>
                                    <div className="flex items-center gap-2">
                                        
                                        <img className="w-8 h-8rounded-full" src={Profile} alt="" />
                                        <div className='text-black'>{approval.name}</div>
                                        
                                    </div>
                                    <div className='text-center'>{approval.userId}</div>
                                    <div className='flex justify-center'>
                                        <Link to="/admin-accept" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md">
                                                          View More
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-4 text-gray-500">No approvals found.</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default RequestApproval