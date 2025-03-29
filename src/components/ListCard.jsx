import React from 'react';
import AddButton from "../assets/add-button.svg"
import DeleteButton from "../assets/delete.svg"

const ListCard = ({ title, items ,showDelete,onAddClick,onDelete}) => {
  return (
    <div className="row-span-3 border border-zinc-200 rounded-xl p-4">
      <div className="grid grid-rows-7 h-96">
        <div className='flex justify-between'>
          <div className="font-semibold text-xl">{title}</div>
          <img className="w-7 h-7 cursor-pointer" src={AddButton} alt="Add Button" onClick={()=>onAddClick(title)} />
        </div>
        <div className="overflow-y-scroll scrollbar-hide row-span-6">
          {items.map((item, index) => (
            <div key={index} className="flex border-b border-zinc-200 py-2 gap-4 justify-between min-h-16">
                <div className="flex gap-4">
                {!showDelete && <img src={item.image} alt="Profile" className="w-10 h-10 " />}
                    <div className='flex flex-col items-start justify-center'>
                        <div className='font-semibold'>{item.name}</div>
                        {title !== "Project List" && <div className="text-sm text-gray-500">ID: {item.userId}</div>}
                        {!showDelete && <div className="text-sm">{item.subtitle}</div>}
                    </div>
                </div>
                
                {showDelete && (
              <img 
        src={DeleteButton} 
        alt="Delete" 
        className="w-6 h-6 cursor-pointer" 
        onClick={() => {
            console.log("Item in ListCard:", item); 
            if (!item.projectId) {
                console.error("Error: Project ID is missing!", item);
                return;
            }
            onDelete(item.projectId);
        }}
    />
)}



               
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCard;