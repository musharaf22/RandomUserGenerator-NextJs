import Navbar from "@/components/Navbar";
import React from "react";
import UserTable from "./UserTable";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="border-2 border-red-500">
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;
