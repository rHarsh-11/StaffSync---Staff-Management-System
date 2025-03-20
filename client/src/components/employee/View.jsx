import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.error(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {employee ? (
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={`http://localhost:5000/${employee.userId.profileImage}`}
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-blue-500 shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-900 mt-4">{employee.userId.name}</h2>
            <p className="text-gray-600 text-sm">Employee ID: {employee.employeeId}</p>
          </div>

          {/* Employee Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <DetailRow label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
            <DetailRow label="Gender" value={employee.gender==="male" ? "Male" : "Female"} />
            <DetailRow label="Department" value={employee.department.dep_name} />
            <DetailRow label="Marital Status" value={employee.maritalStatus === "single" ? "Single" : "Married"} />
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold text-gray-800">Loading...</div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex items-center space-x-4">
    <p className="text-lg font-semibold text-gray-600 w-40">{label}:</p>
    <p className="text-lg text-gray-900">{value}</p>
  </div>
);

export default View;
