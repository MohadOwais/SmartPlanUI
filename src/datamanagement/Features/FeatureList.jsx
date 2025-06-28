import React, { useState } from "react";
import Navbar from "../../homepage/Navbar";
import { _delete, _get, _post, _put } from "../../../services/services_api";
import {
  ADD_FEATURES,
  API_BASE_URL,
  DELETE_FEATURE,
  EDIT_FEATURES,
  LIST_OF_FEATURES,
} from "../../../services/end_points";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FeatureList = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feature, setFeature] = useState("");
  const [editingFeatureId, setEditingFeatureId] = useState(null); // To track edit mode

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${LIST_OF_FEATURES}`);

      if (result.status === 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.log("Error fetching feature data", error);
    }
  };

  const handleAddFeature = async () => {
    if (feature.trim() !== "") {
      try {
        const payload = { feature };
        const result = await _post(`${API_BASE_URL}${ADD_FEATURES}`, payload);

        if (result.status === 200) {
          setData([...data, { id: result.data.id, feature }]);
          resetModal();
        } else {
          alert("Error saving the data");
        }
      } catch (error) {
        console.log("Error saving feature", error);
      }
    }
  };

  const handleEditFeature = async () => {
    if (feature.trim() !== "" && editingFeatureId) {
      try {
        const payload = { feature };
        const result = await _put(
          `${API_BASE_URL}${EDIT_FEATURES}${editingFeatureId}`,
          payload
        );

        if (result.status === 200) {
          setData(
            data.map((item) =>
              item.id === editingFeatureId ? { ...item, feature } : item
            )
          );
          resetModal();
        } else {
          alert("Error updating the data");
        }
      } catch (error) {
        console.log("Error updating feature", error);
      }
    }
  };

  const handleDeleteFeature = async (id) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      try {
        const result = await _delete(`${API_BASE_URL}${DELETE_FEATURE}${id}`);
        if (result.status === 200) {
          setData(data.filter((item) => item.id !== id));
        } else {
          alert("Error deleting the data");
        }
      } catch (error) {
        console.log("Error deleting feature", error);
      }
    }
  };

  const openEditModal = (featureItem) => {
    setFeature(featureItem.feature);
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
        <h2 style={{ marginTop: "100px" }}>Feature List</h2>
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
                    <th scope="col">Feature</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((featureItem, index) => (
                      <tr key={featureItem.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{featureItem.feature}</td>
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
                  {editingFeatureId ? "Edit Feature" : "Add Feature"}
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
                  placeholder="Enter feature name"
                  value={feature}
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
                  {editingFeatureId ? "Save Changes" : "Save Feature"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureList;
