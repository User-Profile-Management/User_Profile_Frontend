import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false); // false by default for mobile

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <div className="h-screen grid grid-rows-11 overflow-hidden">
      
      {/* Header with toggleSidebar passed as prop */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="row-span-10 flex h-full">
        
        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-full z-22 bg-white w-2/3 max-w-xs
            transform transition-transform duration-300 ease-in-out
            ${sidebarVisible ? "translate-x-0" : "-translate-x-full"}
            xl:relative xl:translate-x-0 xl:flex
          `}
        >
          <Sidebar />
        </div>

        {/* Overlay (only on mobile/tablet when sidebar is open) */}
        {sidebarVisible && (
          <div
            className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 backdrop-blur-xs bg-opacity-30 xl:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="overflow-auto scrollbar-hide p-4 bg-zinc-50 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
