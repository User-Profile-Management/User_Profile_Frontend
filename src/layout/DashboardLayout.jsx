import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
      <div className="h-screen grid grid-rows-11">
        <Header />
        <div className="row-span-10 flex">
            <Sidebar />
            <main className="p-4 flex-1 bg-zinc-50">{children}</main>
        </div>
      </div>
    );
  };

export default DashboardLayout;
