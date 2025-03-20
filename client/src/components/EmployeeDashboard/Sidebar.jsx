import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-900 text-gray-300 h-screen fixed left-0 top-0 bottom-0 w-64 shadow-lg">
      <div className="bg-blue-700 h-14 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-white">StaffSync</h3>
      </div>

      <div className="px-4 mt-8 space-y-2">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-300 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"}`
          }
          end
        >
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-300 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"}`
          }
        >
          <FaUser className="text-lg" />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-300 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"}`
          }
        >
          <FaCalendarAlt className="text-lg" />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-300 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"}`
          }
        >
          <FaMoneyBillWave className="text-lg" />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-300 
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"}`
          }
        >
          <FaCogs className="text-lg" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
