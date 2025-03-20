import axios from 'axios';
import React from 'react'

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px"
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "200px"
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    style: { textAlign: "center" }
  }
];

export const AttendanceHelper = ({status, employeeId, statusChange}) => {

  const markEmployee = async (status, employeeId) => {
    const response = await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`, {status}, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      },
    })
    if(response.data.success){
      statusChange()
    }
  }

  return (
    <div>
      {status === null ? (
        <div>
          <button className='px-3 py-2 mx-2 rounded-sm hover:cursor-pointer bg-green-500 text-white' onClick={() => markEmployee("present", employeeId)}>Present</button>
          <button className='px-3 py-2 mx-2 rounded-sm bg-red-500 hover:cursor-pointer text-white' onClick={() => markEmployee("absent", employeeId)}>Absent</button>
          <button className='px-3 py-2 mx-2 rounded-sm bg-gray-500 hover:cursor-pointer text-white' onClick={() => markEmployee("sick", employeeId)}>Sick</button>
          <button className='px-3 py-2 mx-2 rounded-sm bg-yellow-500 hover:cursor-pointer text-white' onClick={() => markEmployee("leave", employeeId)}>Leave</button>
        </div>
      ) : (
        <p>{status}</p>
      )}
    </div>
  )
};
