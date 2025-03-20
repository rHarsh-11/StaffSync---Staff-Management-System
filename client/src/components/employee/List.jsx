import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        setEmpLoading(true);
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response);
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img width={50} className='rounded-full shadow-md' src={`http://localhost:5000/${emp.userId.profileImage}`} />,
              action: (<EmployeeButtons _id={emp._id}></EmployeeButtons>)
            }

          ));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.error(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployes();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className='p-8 bg-gray-100 min-h-screen text-gray-800'>
      <div className='text-center mb-6'>
        <h3 className='text-3xl font-bold text-gray-900'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center mb-6'>
        <input 
          type="text" 
          placeholder='Search Employees...' 
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500' 
          onChange={handleFilter}
        />
        <Link to="/admin-dashboard/add-employee" 
          className='px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300'>
          + Add Employee
        </Link>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <DataTable 
          columns={columns} 
          data={filteredEmployees} 
          pagination
          progressPending={empLoading}
          customStyles={{
            headRow: {
              style: {
                backgroundColor: '#f8fafc',
                color: '#1f2937',
                fontWeight: 'bold'
              }
            },
            rows: {
              style: {
                backgroundColor: '#ffffff',
                color: '#1f2937'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default List;
