import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const List = () => {
  const [leaves, setLeaves] = useState([])
  let sno = 1;
  const { id } = useParams()
  const { user } = useAuth()

  const fetchLeaves = async () => {
    try{
      const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(response.data.success){
        setLeaves(response.data.leaves);
      }
    } catch(error) {
      if(error.response && error.response.data.success) {
        console.log(error.message)
      }
    }
  }
  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold mb-4'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center mt-3'>
        <input type="text" placeholder='Search' className='px-4 py-0.5 border' />
        {user.role === "employee" && (
          <Link  to="/employee-dashboard/add-leave" className='px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 text-white'>
          Add New Leave
          </Link>
        )}
      </div>
      <table className='w-full text-sm text-left text-gray-500 mt-5'>
        <thead className='text-xs text-grey-700 uppercase bg-gray-50 border border-gray-200'>
          <tr>
            <th className='px-6 py-3'>S No</th>
            <th className='px-6 py-3'>Leave Type</th>
            <th className='px-6 py-3'>From</th>
            <th className='px-6 py-3'>To</th>
            <th className='px-6 py-3'>Description</th>
            <th className='px-6 py-3'>Applied Date</th>
            <th className='px-6 py-3'>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <td className='px-6 py-3'>{sno++}</td>
              <td className='px-6 py-3'>{leave.leaveType}</td>
              <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td className='px-6 py-3'>{leave.reason}</td>
              <td className='px-6 py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
              <td className='px-6 py-3'>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default List