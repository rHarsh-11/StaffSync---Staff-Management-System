import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action
  }
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.error(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-md transition duration-300 shadow-md"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-md transition duration-300 shadow-md"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
