import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

// Common headers for API requests
const getHeaders = () => ({
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/department`, getHeaders());
    if (response.data.success) return response.data.departments;
  } catch (error) {
    console.error(error.response?.data?.error || "Error fetching departments");
  }
  return [];
};

export const getEmployees = async (departmentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee/department/${departmentId}`, getHeaders());
    if (response.data.success) return response.data.employees;
  } catch (error) {
    console.error(error.response?.data?.error || "Error fetching employees");
  }
  return [];
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>

      <button 
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>

      <button 
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}/`)}
      >
        Salary
      </button>

      <button 
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};

export const columns = [
  { name: "S No", selector: (row) => row.sno, width: "70px" },
  { name: "Name", selector: (row) => row.name, sortable: true, width: "200px" },
  { name: "Image", selector: (row) => row.profileImage, width: "100px" },
  { name: "Department", selector: (row) => row.dep_name, width: "150px" },
  { name: "D.O.B", selector: (row) => row.dob, sortable: true, width: "130px" },
  { name: "Action", selector: (row) => row.action, center: true }
];
