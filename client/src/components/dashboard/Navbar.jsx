import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const {user, logout} = useAuth()
  return (
    <div className='flex items-center text-gray-200 justify-between h-14 bg-gray-900 shadow-md px-6'>
      <p className='text-lg font-medium'>Welcome, <span className='font-semibold'>{user.name}</span></p>
      <button className='px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 text-white' onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar