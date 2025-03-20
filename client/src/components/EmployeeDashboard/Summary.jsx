import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="flex items-center bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <div className="text-4xl flex justify-center items-center bg-blue-600 text-white w-16 h-16 rounded-full shadow-md">
          <FaUser />
        </div>

        <div className="pl-4">
          <p className="text-gray-500 text-lg">Welcome Back,</p>
          <p className="text-2xl font-bold text-gray-800">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
