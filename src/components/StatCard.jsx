import React from 'react'

function StatCard({ number, title, color }) {
    
    return (
        <div className={`row-span-2 rounded-xl ${color} text-white flex flex-col h-full justify-center items-center gap-y-3`}>
          <h1 className="text-8xl font-bold">{number}</h1>
          <p className="text-md font-semibold md:text-xl text-center">{title}</p>
        </div>
    )
}

export default StatCard;
