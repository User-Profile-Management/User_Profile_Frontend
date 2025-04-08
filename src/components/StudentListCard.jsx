import React from 'react';
 
const StudentListCard = ({ items }) => {
  return (
    <div className="overflow-y-scroll scrollbar-hide row-span-5">
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={index}
            className="flex border-b border-zinc-200 py-2 gap-4 justify-between min-h-16 items-center cursor-pointer"
          >
            <div className="flex gap-4">
              {item.image && (
                <img src={item.image} alt="Profile" className="w-10 h-10 rounded-lg border border-zinc-100 p-1 object-contain" />
              )}
              <div className="flex flex-col items-start justify-center">
                <div className="font-semibold">{item.name}</div>
                {item.userId && (
                  <div className="text-sm text-gray-500">ID: {item.userId}</div>
                )}
                {item.subtitle && (
                  <div className="text-sm">{item.subtitle}</div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">No students found</div>
      )}
    </div>
  );
};
 
export default StudentListCard;
 
 
