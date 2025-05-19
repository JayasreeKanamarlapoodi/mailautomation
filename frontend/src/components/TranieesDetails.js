import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/TraineeDetails.css';

const TraineeDetails = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/alltrainees');
      console.log(res.data)
      setData(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
       
        const statusDetails={
            id:id,
            status:newStatus
        }
        console.log("id,newStatus",statusDetails);
      const res= await axios.put(`http://localhost:8080/api/updateStatus`,{
        method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(statusDetails),
        });
        console.log(res);
      alert(`Status updated to ${newStatus} and email sent.`);
      fetchEmployees(); // refresh list
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">User Information</h2>
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.traineeName}</td>
                <td>{row.mail}</td>
                <td>{row.mobileNumber}</td>
                <td className={row.status === 'Selected' ? 'status-active' : 'status-inactive'}>
                  {row.status}
                </td>
                <td>
                  <button onClick={() => updateStatus(row.id, 'Selected')}>Select</button>
                  <button onClick={() => updateStatus(row.id, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          &lt; Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={currentPage === index + 1 ? 'active-page' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default TraineeDetails;
