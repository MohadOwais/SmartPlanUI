import React, { useEffect, useState } from "react";
import { _delete, _get } from "../../services/services_api";
import { GET_USER, API_BASE_URL, DELETE_USER } from "../../services/end_points";
import "../publicCSS/public.css";
import Navbar from "../homepage/Navbar";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      const response = await _get(`${API_BASE_URL}${GET_USER}`);

      if (response.status === 200) {
        setData(response.data.data); // Assuming response.data is an array
      } else {
        setError("Failed to fetch data. Please try again."); // Handle non-200 status codes
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data."); // Handle fetch errors
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (userId) => {
    const updatedData = data.map((user) =>
      user.id === userId ? { ...user, status: user.status === 1 ? 0 : 1 } : user
    );
    setData(updatedData);
  };
  const handleEdit = (id, user) => {
    navigate(`/Edit-user/${id}`, { state: { id, user } });
  };
  const DeleteById = async (id) => {
    const result = await _delete(`${API_BASE_URL}${DELETE_USER}${id}`);
    if (result.status === 200) {
      window.location.reload();
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 style={{ marginTop: "100px" }}>User List</h2>
        <div
          className="card"
          style={{
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <div className="card-body">
            {loading ? (
              <div className="text-center">Loading...</div> // Show loading indicator
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div> // Show error message
            ) : (
              // <div className="table-responsive">
              // <table className="table table-striped">
              //   <thead className="table-secondary">
              <table className="table table-striped">
                <thead class="table-secondary">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles === 1 ? "Admin" : "Agents"}</td>
                        <td>
                          <button
                            className={`btn btn-${
                              user.status === 1 ? "success" : "danger"
                            } btn-sm`}
                            style={{ borderRadius: "12px" }}
                          >
                            {user.status === 1 ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <i
                              className="bi bi-pencil"
                              style={{ marginRight: "5px" }}
                              onClick={() => handleEdit(user.id, user)}
                            ></i>

                            <i
                              className="bi bi-trash"
                              style={{ marginRight: "5px" }}
                              onClick={() => DeleteById(user.id)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
