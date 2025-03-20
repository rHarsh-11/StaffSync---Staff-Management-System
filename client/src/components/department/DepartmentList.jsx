import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons _id={dep._id} onDepartmentDelete={fetchDepartments} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      console.error(error.response?.data?.error || "Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = departments.filter((dep) => dep.dep_name.toLowerCase().includes(searchValue));
    setFilteredDepartments(filteredData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-center mb-4">Manage Departments</h3>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Department"
          className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
          onChange={handleSearch}
        />
        <Link to="/admin-dashboard/add-department" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add New Department
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <DataTable columns={columns} data={filteredDepartments} pagination />
      )}
    </div>
  );
};

export default DepartmentList;
