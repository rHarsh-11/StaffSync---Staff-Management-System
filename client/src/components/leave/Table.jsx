import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("API response: ", response.data);
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId ? leave.employeeId.employeeId : "N/A",
          name: leave.employeeId ? leave.employeeId.userId.name : "Unknown",
          leaveType: leave.leaveType,
          department: leave.employeeId ? leave.employeeId.department.dep_name : "N/A",
          days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mt-3">
            <input
              type="text"
              placeholder="Search by Emp ID"
              className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={filterByInput}
            />

            <div className="space-x-3">
              <button
                className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-md transition duration-300 shadow-md"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-md transition duration-300 shadow-md"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-md transition duration-300 shadow-md"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-lg font-semibold text-gray-600">Loading...</div>
      )}
    </>
  );
};

export default Table;
