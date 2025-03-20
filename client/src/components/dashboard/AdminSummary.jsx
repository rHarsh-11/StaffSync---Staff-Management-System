import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers, FaUniversity, FaWallet, FaClipboardList, FaThumbsUp, FaHourglass, FaBan } from 'react-icons/fa';
import axios from 'axios';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="flex justify-center items-center h-screen text-gray-600 text-lg">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-blue-500" />
        <SummaryCard icon={<FaUniversity />} text="Total Departments" number={summary.totalDepartments} color="bg-purple-500" />
        <SummaryCard icon={<FaWallet />} text="Monthly Salary" number={formatCurrency(summary.totalSalary)} color="bg-green-500" />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold text-gray-800">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <SummaryCard icon={<FaClipboardList />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-indigo-500" />
          <SummaryCard icon={<FaThumbsUp />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-500" />
          <SummaryCard icon={<FaHourglass />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-500" />
          <SummaryCard icon={<FaBan />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-500" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
