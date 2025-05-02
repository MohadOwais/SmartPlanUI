import React, { useState } from "react";
import Navbar from "../../homepage/Navbar";
import { _delete, _get, _post, _put } from "../../../services/services_api";
import {
  API_BASE_URL,
  LIST_OF_Facilities,
  ADD_Facilities,
  EDIT_Facilities,
  DELETE_Facilities,
} from "../../../services/end_points";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FacilitiesList = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [facility, setFeature] = useState("");
  const [editingFeatureId, setEditingFeatureId] = useState(null); // To track edit mode

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${LIST_OF_Facilities}`);
      if (result.status === 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.log("Error fetching facility data", error);
    }
  };

  const handleAddFeature = async () => {
    if (facility.trim() !== "") {
      try {
        const payload = { facility };
        console.log("inpust ", payload);
        const result = await _post(`${API_BASE_URL}${ADD_Facilities}`, payload);

        if (result.status === 200) {
          setData([...data, { id: result.data.id, facility }]);
          resetModal();
        } else {
          alert("Error saving the data");
        }
      } catch (error) {
        console.log("Error saving facility", error);
      }
    }
  };

  const handleEditFeature = async () => {
    if (facility.trim() !== "" && editingFeatureId) {
      try {
        const payload = { facility };
        const result = await _put(
          `${API_BASE_URL}${EDIT_Facilities}${editingFeatureId}`,
          payload
        );

        if (result.status === 200) {
          setData(
            data.map((item) =>
              item.id === editingFeatureId ? { ...item, facility } : item
            )
          );
          resetModal();
        } else {
          alert("Error updating the data");
        }
      } catch (error) {
        console.log("Error updating facility", error);
      }
    }
  };

  const handleDeleteFeature = async (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        const result = await _delete(
          `${API_BASE_URL}${DELETE_Facilities}${id}`
        );
        if (result.status === 200) {
          setData(data.filter((item) => item.id !== id));
        } else {
          alert("Error deleting the data");
        }
      } catch (error) {
        console.log("Error deleting facility", error);
      }
    }
  };

  const openEditModal = (featureItem) => {
    setFeature(featureItem.facility);
    setEditingFeatureId(featureItem.id);
    setShowModal(true);
  };

  const resetModal = () => {
    setFeature("");
    setEditingFeatureId(null);
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 style={{ marginTop: "100px" }}>Facilities List</h2>
        <div className="card" style={{ width: "100%", borderRadius: "20px" }}>
          <div className="card-body">
            <div className="d-flex justify-content-end mb-2">
              <i
                className="bi bi-plus fs-4"
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              ></i>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">Serial Number</th>
                    <th scope="col">facility</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((featureItem, index) => (
                      <tr key={featureItem.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{featureItem.facility}</td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <i
                              className="bi bi-pencil me-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => openEditModal(featureItem)}
                            ></i>
                            <i
                              className="bi bi-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleDeleteFeature(featureItem.id)
                              }
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
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
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingFeatureId ? "Edit facility" : "Add facility"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetModal}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter facility name"
                  value={facility}
                  onChange={(e) => setFeature(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    editingFeatureId ? handleEditFeature : handleAddFeature
                  }
                >
                  {editingFeatureId ? "Save Changes" : "Save facility"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacilitiesList;
