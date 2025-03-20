import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.error(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Edit Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                onChange={handleChange}
                value={department.dep_name}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-300"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                value={department.description}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md block focus:ring focus:ring-teal-300"
                rows="4"
              ></textarea>
            </div>
            <button
              className="w-full mt-6 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md"
            >
              Update Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
