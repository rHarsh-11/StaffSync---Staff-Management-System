import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Employee</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <InputField label="Name" name="name" type="text" placeholder="Enter Name" onChange={handleChange} />
          <InputField label="Email" name="email" type="email" placeholder="Enter Email" onChange={handleChange} />
          <InputField label="Employee ID" name="employeeId" type="text" placeholder="Employee ID" onChange={handleChange} />
          <InputField label="Date of Birth" name="dob" type="date" onChange={handleChange} />
          
          <SelectField label="Gender" name="gender" onChange={handleChange} options={[{ value: '', text: 'Select Gender' }, { value: 'male', text: 'Male' }, { value: 'female', text: 'Female' }, { value: 'other', text: 'Other' }]} />
          
          <SelectField label="Marital Status" name="maritalStatus" onChange={handleChange} options={[{ value: '', text: 'Select Status' }, { value: 'single', text: 'Single' }, { value: 'married', text: 'Married' }]} />

          <InputField label="Designation" name="designation" type="text" placeholder="Designation" onChange={handleChange} />
          
          <SelectField label="Department" name="department" onChange={handleChange} options={[{ value: '', text: 'Select Department' }, ...departments.map(dep => ({ value: dep._id, text: dep.dep_name }))]} />
          
          <InputField label="Salary" name="salary" type="number" placeholder="Salary" onChange={handleChange} />
          <InputField label="Password" name="password" type="password" placeholder="********" onChange={handleChange} />

          <SelectField label="Role" name="role" onChange={handleChange} options={[{ value: '', text: 'Select Role' }, { value: 'admin', text: 'Admin' }, { value: 'employee', text: 'Employee' }]} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
          Add Employee
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type, placeholder, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input type={type} name={name} placeholder={placeholder} onChange={onChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
  </div>
);

const SelectField = ({ label, name, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select name={name} onChange={onChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  </div>
);

export default Add;
