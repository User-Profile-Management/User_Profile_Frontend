import React, { useState, useMemo } from 'react';
import AddButton from "../assets/add-button.svg";
import DeleteButton from "../assets/delete.svg";
import SearchIcon from '../assets/search.png';

const ListCard = ({ title, items, showDelete, onAddClick, onDelete, onEdit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.userId && item.userId.includes(searchQuery))
    );
  }, [items, searchQuery]);

  return (
    <div className="row-span-3 bg-white border border-zinc-200 rounded-xl p-4">
      <div className="grid grid-rows-7 h-96">
        <div className='flex justify-between'>
          <div className="font-semibold text-xl">{title}</div>
          <img 
            className="w-7 h-7 cursor-pointer" 
            src={AddButton} 
            alt="Add" 
            onClick={() => onAddClick(title)} 
          />
        </div>

        {/* Search Bar */}
        <div className='flex py-1'>
          <div className='relative flex-1 flex items-center'>
            <img 
              src={SearchIcon}  
              alt="Search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <input 
              type="text" 
              placeholder={`Search ${title}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-1 bg-white border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>

        {/* List Items */}
        <div className="overflow-y-scroll scrollbar-hide row-span-5">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div 
                key={index} 
                className="flex border-b border-zinc-200 py-2 gap-4 justify-between min-h-16 items-center cursor-pointer"
                onClick={() => onEdit(item)}
              >
                <div className="flex gap-4">
                  {!showDelete && <img src={item.image} alt="Profile" className="w-10 h-10" />}
                  <div className='flex flex-col items-start justify-center'>
                    <div className='font-semibold'>{item.name}</div>
                    {title !== "Project List" && item.userId && (
                      <div className="text-sm text-gray-500">ID: {item.userId}</div>
                    )}
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
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">No items found</div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ListCard;
