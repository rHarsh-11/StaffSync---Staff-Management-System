import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AttendanceReport = () => {
  const [report, setReport] = useState({})
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [dateFilter, setDateFilter] = useState()
  const [loading, setLoading] = useState(false)

  const fetchReport = async () => {
    try{
      setLoading(true);
      const query = new URLSearchParams({limit, skip})
      if(dateFilter){
        query.append("date", dateFilter)
      }
      const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`,{
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data)
      if(response.data.success){
        if(skip==0) {
          setReport(response.data.groupData)
        }else{
          setReport((prevData) => ({...prevData, ...response.data.groupData}))
        }
      }
      setLoading(false)
    } catch(error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter])

  const handleLoadMore = () => {
    setSkip((prevSkip) =>  prevSkip + limit)
  }
  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-center text-3xl font-bold text-gray-800 mb-6'>Attendance Report</h1>
        
        <div className='mb-4'>
          <label className='text-lg font-semibold text-gray-700'>Filter by Date:</label>
          <input 
            type="date" 
            className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500'
            value={dateFilter || ""}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSkip(0);
            }}
          />
        </div>

        {loading ? (
          <div className='text-center text-gray-500 text-lg'>Loading...</div>
        ) : (
          Object.entries(report).map(([date, record]) => (
            <div key={date} className='mt-6'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>{date}</h2>
              <div className="overflow-x-auto">
                <table className='w-full border-collapse border border-gray-300 shadow-sm rounded-lg'>
                  <thead className='bg-gray-200 text-gray-700'>
                    <tr>
                      <th className='p-3 text-left border border-gray-300'>S No</th>
                      <th className='p-3 text-left border border-gray-300'>Employee ID</th>
                      <th className='p-3 text-left border border-gray-300'>Name</th>
                      <th className='p-3 text-left border border-gray-300'>Department</th>
                      <th className='p-3 text-left border border-gray-300'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.map((data, i) => (
                      <tr key={`${date}-${data.employeeId}`} className='odd:bg-gray-50 even:bg-white'>
                        <td className='p-3 border border-gray-300'>{i + 1}</td>
                        <td className='p-3 border border-gray-300'>{data.employeeId}</td>
                        <td className='p-3 border border-gray-300'>{data.employeeName}</td>
                        <td className='p-3 border border-gray-300'>{data.departmentName}</td>
                        <td className='p-3 border border-gray-300'>{data.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}

        {/* Load More Button */}
        <div className='mt-6 flex justify-center'>
          <button 
            className='bg-blue-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out'
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceReport