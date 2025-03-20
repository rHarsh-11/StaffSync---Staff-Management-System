import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarCheck, FaTools, FaWallet, FaCalendarDay } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';

const AdminSidebar = () => {
  return (
    <div className='bg-gray-900 text-gray-200 h-screen fixed left-0 top-0 bottom-0 w-64 shadow-lg'>
      <div className='bg-blue-600 h-14 flex items-center justify-center shadow-md'>
        <h3 className='text-2xl font-semibold'>StaffSync</h3>
      </div>
      <div className='px-4 mt-4 space-y-2'>
        <NavLink to='/admin-dashboard' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`} end>
          <FaTachometerAlt className='text-lg' />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to='/admin-dashboard/employees' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <FaUsers className='text-lg' />
          <span>Employees</span>
        </NavLink>
        <NavLink to='/admin-dashboard/departments' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <FaBuilding className='text-lg' />
          <span>Departments</span>
        </NavLink>
        <NavLink to='/admin-dashboard/leaves' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <FaCalendarCheck className='text-lg' />
          <span>Leaves</span>
        </NavLink>
        <NavLink to='/admin-dashboard/salary/add' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <FaWallet className='text-lg' />
          <span>Salary</span>
        </NavLink>
        <NavLink to='/admin-dashboard/attendance' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <FaCalendarDay className='text-lg' />
          <span>Attendance</span>
        </NavLink>
        <NavLink to='/admin-dashboard/attendance-report' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <AiOutlineFileDone className='text-lg' />
          <span>Attendance Report</span>
        </NavLink>
        <NavLink to='/admin-dashboard/setting' className={({ isActive }) => `${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-700'} flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-300`}>
          <FaTools className='text-lg' />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;