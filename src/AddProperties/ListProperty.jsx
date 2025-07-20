import React, { useEffect, useState } from "react";
import {
  API_BASE_URL,
  DELETE_HOME,
  LIST_PROPERTY,
} from "../../services/end_points";
import Navbar from "../homepage/Navbar";
import { _delete, _get } from "../../services/services_api";
import { useNavigate } from "react-router-dom";

const ListProperty = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userid = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await _get(`${API_BASE_URL}${LIST_PROPERTY}${userid}`);

      if (response.status === 200) {
        setData(response.data.data);
        // console.log("data in Property", response.data.data);
      } else {
        setError("Failed to fetch data. Please try again."); // Handle non-200 status codes
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data."); // Handle fetch errors
    } finally {
      setLoading(false); // Stop loading after fetch attempt
    }
  };

  const handleEdit = (id, user) => {
    navigate(`/Edit-property/${id}`, { state: { id, user } });
  };
  const handleDelete = async (id) => {
    try {
      const result = await _delete(`${API_BASE_URL}${DELETE_HOME}${id}`);
      if (result.status === 200) {
        console.log("Property deleted successfully");
        fetchData(); // Refresh the data after deletion
      }
    } catch (error) {
      console.log("Delete property with ID:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 style={{ marginTop: "100px" }}>Apartment List</h2>
        <div
          className="card"
          style={{
            width: "100%",
            borderRadius: "20px",
            // marginTop: "100px",
          }}
        >
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Apartment Name</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Year Of Completion</th>
                    {/* <th scope="col">UserId</th> */}
                    {/* <th scope="col">Property Plan</th> */}
                    <th scope="col">Property Property</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.ApartmentName}</td>
                        <td>{user.companyName}</td>
                        {/* <td>{user.BathRoomSize}</td> */}
                        <td>{user.YearOfCompletion}</td>
                        {/* <td>{user.UserId}</td> */}
                        <td>{user.selectPlan === 1 ? "OffPlan" : "Ready"}</td>
                        {/* <td>{user.propertyType}</td> */}
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
                              onClick={() => handleDelete(user.id)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListProperty;
