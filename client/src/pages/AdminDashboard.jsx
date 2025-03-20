import React from 'react'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const {user, loading} = useAuth()
  
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-grey-100 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard