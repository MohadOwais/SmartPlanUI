import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../homepage/Navbar";
import Addusers from "../assets/Addusers.jpeg";
import Logoimg from "../assets/ComapanyLogo.jpg";
import { _delete, _get, _post, _put } from "../../services/services_api";
import {
  ADD_HOME,
  API_BASE_URL,
  GET_USER,
  IMG_API_BASE_URL,
  LIST_OF_Facilities,
  LIST_OF_FEATURES,
  PROPERTY_IMG,
  DELETE_PROPERTY_IMG,
  Filter_Featutes_FACILITIES,
  DELETE_FEATURES_FACILITIES,
  GET_PRICE,
  UPDATE_PRICE,
} from "../../services/end_points";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Editproperty = () => {
  const location = useLocation();
  const { id, user } = location.state;
  const userId = user.id;
  const editing = true;

  const [manageFields, setManageFields] = useState(false);

  const [formData, setFormData] = useState({
    selectPlan: editing ? user.selectPlan : "",
    companyName: editing ? user.companyName : "",
    ApartmentName: editing ? user.ApartmentName : "",
    propertyType: editing ? user.propertyType : "",
    area: editing ? user.area : "",
    // ImagePath: editing ? user.ImagePath : "",
    ImagePath: editing && user.ImagePath ? JSON.parse(user.ImagePath) : [],
    CurrentLocation: editing ? user.CurrentLocation : "",
    NearBy: editing ? user.NearBy : [],
    Overview: editing ? user.Overview : "",
    Facilities: Array.isArray(user.Facilities) ? user.Facilities : [],
    Features: Array.isArray(user.Features) ? user.Features : [],
    BedroomSize: editing ? user.BedRoomSize : "",
    BathroomSize: editing ? user.BathRoomSize : "",
    Grage: editing ? user.Grage : "",
    YearOfCompletion: editing ? user.YearOfCompletion : "",
    Tablecontent: editing ? user.TableContent : [],
    Owner: editing ? user.Owner : "",
    UserId: editing ? user.UserId : "",
  });
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [normalPlanData, setNormalPlanData] = useState(["", "", ""]);

  const [PriceData, setPriceData] = useState({
    selectPlan: "0",
    nameOfappt: "",
    bank: "",
    cash: "",
    onBookingPP: "",
    duringConstructionPP: "",
    uponHandoverPP: "",
    onBookingHP: "",
    duringConstructionHP: "",
    uponHandoverHP: "",
  });
  const [rows, setRows] = useState([{ unit: "", areaSQft: "", price: "" }]);
  // const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [dataFeatures, setDataFeatures] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const addRow = () => {
    setRows([...rows, { unit: "", areaSQft: "", price: "" }]);
  };

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

  const fetchFeaturesData = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${LIST_OF_FEATURES}`);
      if (result.status === 200) {
        setDataFeatures(result.data.data);
      }
    } catch (error) {
      console.log("Error fetching feature data", error);
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  useEffect(() => {
    FetchPriceEdit();

    setPriceData((prev) => ({
      ...prev,
      nameOfappt: formData.ApartmentName || "",
    }));
    // fetchUser();
    fetchData();
    fectImg();
    fetchFilter();
    fetchFeaturesData();
  }, [formData.ApartmentName]);

  useEffect(() => {
    setManageFields(formData.selectPlan === 1);
  }, [formData.selectPlan]);

  useEffect(() => {
    // Only run if editing and user.tableBody exists
    if (editing && user.tableBody) {
      try {
        const parsedRows = JSON.parse(user.tableBody).map((row) => ({
          unit: row.unit || "",
          areaSQft: row.area || "",
          price: row.startprice || "",
        }));
        setRows(parsedRows);
      } catch (e) {
        // fallback to default if parsing fails
        setRows([{ unit: "", areaSQft: "", price: "" }]);
      }
    }
  }, [editing, user]);
  const FetchPriceEdit = async () => {
    try {
      const result = await _get(
        `${API_BASE_URL}${GET_PRICE}${user.ApartmentName}`
      );
      if (
        result.status === 200 &&
        result.data.data &&
        result.data.data.length > 0
      ) {
        const plan = result.data.data[0];
        setPriceData({
          selectPlan: plan.selectPlan,
          nameOfappt: plan.home,
          bank: plan.bank || "",
          cash: plan.cash || "",
          onBookingPP: plan.onBookingPricePlan || "",
          duringConstructionPP: plan.DuringConstructionPricePlan || "",
          uponHandoverPP: plan.UponHandoverPricePlan || "",
          onBookingHP: plan.onBookingPostHandover || "",
          duringConstructionHP: plan.DuringConstructionPostHandover || "",
          uponHandoverHP: plan.UponHandoverPostHandover || "",
        });
      }
    } catch (error) {
      console.error("Error fetching price plan:", error);
    }
  };

  // const HandlePayment=async()
  const HandlePayment = async (e) => {
    e.preventDefault();
    try {
      const result = await _put(
        `${API_BASE_URL}${UPDATE_PRICE}${user.ApartmentName}`,
        PriceData
      );
      if (result.status === 200) {
        setPriceData({
          selectPlan: "0",
          nameOfappt: "",
          bank: "",
          cash: "",
          onBookingPP: "",
          duringConstructionPP: "",
          uponHandoverPP: "",
          onBookingHP: "",
          duringConstructionHP: "",
          uponHandoverHP: "",
        });
        alert("Price Plan Updated successfully!");
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const fectImg = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${PROPERTY_IMG}${user.id}`);
      // console.log("img", result);
      if (result.status === 200 && result.data.data) {
        const imageObjs = result.data.data.map((imgObj) => ({
          id: imgObj.id,
          path: imgObj.images,
        }));
        setFile(imageObjs);
      }
    } catch (error) {
      console.log("Error fetching facility data", error);
    }
  };
  const [activeFacilities, setActiveFacilities] = useState([]);
  const [activeFeatures, setActiveFeatures] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]); // array of IDs
  const [selectedFeatures, setSelectedFeatures] = useState([]); // array of IDs

  const fetchFilter = async () => {
    try {
      const result = await _get(
        `${API_BASE_URL}${Filter_Featutes_FACILITIES}${user.id}`
      );

      if (result.status === 200 && result.data.data) {
        const facilities = [];
        const features = [];
        result.data.data.forEach((item) => {
          if (item.facility_name && !facilities.includes(item.facility_name)) {
            facilities.push(item.facility_name);
          }
          if (item.feature_name && !features.includes(item.feature_name)) {
            features.push(item.feature_name);
          }
        });
        setActiveFacilities(facilities);
        setActiveFeatures(features);
      }
    } catch (error) {
      console.log("Error fetching filter data", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceData((prevPriceData) => ({
      ...prevPriceData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile([...e.target.files]);
  };

  const handleCheckboxChange = async (e, key) => {
    const { value, checked } = e.target;
    const id = Number(value); // Always store as number

    const currentArr = Array.isArray(formData[key]) ? formData[key] : [];
    if (checked) {
      setFormData({ ...formData, [key]: [...currentArr, id] });
    } else {
      setFormData({
        ...formData,
        [key]: currentArr.filter((item) => item !== id),
      });

      // Call backend delete API for both Facilities and Features
      try {
        if (key === "Facilities") {
          await axios.delete(
            `${API_BASE_URL}${DELETE_FEATURES_FACILITIES}${user.id}?facility=${id}`
          );
        } else if (key === "Features") {
          await axios.delete(
            `${API_BASE_URL}${DELETE_FEATURES_FACILITIES}${user.id}?feature=${id}`
          );
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const [newFiles, setNewFiles] = useState([]);

  const getTableDataAsJson = () => {
    return rows.map((row) => ({
      unit: row.unit,
      area: row.areaSQft,
      startprice: row.price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(true);
    const Id = localStorage.getItem("userId");
    if (!id) {
      alert("User ID not found in local storage.");
      return;
    }
    try {
      let submitData = {
        ...formData,
        Tablecontent: getTableDataAsJson(), // Always send mapped table data
        UserId: Id, // Force-set userId here in formData
      };
      if (!manageFields) {
        submitData.Tablecontent = rows;
      }
      const fileData = new FormData();

      // Only append new files
      if (newFiles && newFiles.length > 0) {
        for (let i = 0; i < newFiles.length; i++) {
          fileData.append("image", newFiles[i]);
        }
      }

      // Add other fields
      for (const key in submitData) {
        if (Array.isArray(submitData[key])) {
          submitData[key].forEach((item) => {
            fileData.append(`${key}[]`, item);
          });
        } else {
          fileData.append(key, submitData[key]);
        }
      }

      if (newFiles && newFiles.length > 0) {
        // ... upload with images
        await axios.put(
          `${IMG_API_BASE_URL}/property-update/${userId}`,
          fileData
        );
        alert("Property Updated successfully!");
        navigate("/property");
        setFormData({
          selectPlan: "0",
          propertyType: "",
          area: "",
          ImagePath: null,
          CurrentLocation: "",
          NearBy: [],
          Overview: "",
          Facilities: [],
          Owner: "",
        });
        setNewFiles([]); // Clear new files after upload
        navigate("/property");
      } else {
        // Send update without images
        const response = await axios.put(
          `${IMG_API_BASE_URL}/property-update/${userId}`,
          submitData // or use FormData if your backend expects it
        );
        if (response.status === 200) {
          alert("Property Updated successfully!");
          navigate("/property");
          setFormData({
            selectPlan: "0",
            propertyType: "",
            area: "",
            ImagePath: null,
            CurrentLocation: "",
            NearBy: [],
            Overview: "",
            Facilities: [],
            Owner: "",
          });
          navigate("/property");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const Submiting = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${IMG_API_BASE_URL}/price/price-plan`,

        PriceData
      );
      if (response.status === 200) {
        setPriceData({
          selectPlan: "0",
          nameOfappt: "",
          bank: "",
          cash: "",
          onBookingPP: "",
          duringConstructionPP: "",
          uponHandoverPP: "",
          onBookingHP: "",
          duringConstructionHP: "",
          uponHandoverHP: "",
        });
        const modalElement = document.getElementById("staticBackdrop");
        const modalInstance = bootstrap.Modal.getInstance(modalElement); // For Bootstrap v5
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleCheckbox = (e) => {
    const isChecked = e.target.checked; // Get checkbox state
    setManageFields(isChecked); // Update manageFields state

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectPlan: isChecked ? 1 : 0, // Store as '1' or '0'
    }));

    setPriceData((prevPriceData) => ({
      ...prevPriceData,
      selectPlan: isChecked ? 1 : 0, // ✅ Corrected from prevPriceData to selectPlan
    }));
  };
  const handleDeleteImg = async (id) => {
    try {
      await _delete(`${API_BASE_URL}${DELETE_PROPERTY_IMG}${id}`);
      fectImg(); // Refresh images after delete
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  // const handleCheckbox = (e) => {
  //   const isChecked = e.target.checked; // Get checkbox state
  //   setManageFields(isChecked); // Update manageFields state

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     selectPlan: isChecked ? "1" : "0", // Store as '1' or '0'
  //   }));
  //   setPriceData((prevPriceData) => ({
  //     ...prevPriceData,
  //     prevPriceData: isChecked ? "1" : "0", // Store as '1' or '0'
  //   }));
  // };
  // console.log("inputs",formData)
  // console.log("files",file)
  const handleAddMoreImages = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewFiles(files); // Only store new files here

    // Optionally, you can upload immediately here, or wait for submit
  };

  useEffect(() => {
    // Only run if both master lists and active names are loaded
    if (data.length && activeFacilities.length) {
      const facilityIds = activeFacilities
        .map((name) => {
          const found = data.find((f) => f.facility === name);
          return found ? found.id : null;
        })
        .filter(Boolean);
      setFormData((prev) => ({ ...prev, Facilities: facilityIds }));
    }
    if (dataFeatures.length && activeFeatures.length) {
      const featureIds = activeFeatures
        .map((name) => {
          const found = dataFeatures.find((f) => f.feature === name);
          return found ? found.id : null;
        })
        .filter(Boolean);
      setFormData((prev) => ({ ...prev, Features: featureIds }));
    }
  }, [data, dataFeatures, activeFacilities, activeFeatures]);
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div
              className="card"
              style={{
                width: "100%",
                marginTop: "20px",
                borderRadius: "20px",
              }}
            >
              <div
                className="card-body"
                style={{
                  backgroundColor: "#3c2415",
                  // background: "#f6eeeb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      className="logoClass"
                      src={Logoimg}
                      alt="logo img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                <hr />

                <form style={{ width: "100%" }} encType="multipart/form-data">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <label
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Select Plan
                        </label>
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{ width: "300px" }}
                        >
                          <label
                            className="form-check-label"
                            htmlFor="availabilitySwitch"
                            style={{
                              color: "white",
                              flex: 1,
                              textAlign: "left",
                            }}
                          >
                            Secondary
                          </label>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="availabilitySwitch"
                              checked={formData.selectPlan === 1}
                              onChange={handleCheckbox}
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor="availabilitySwitch"
                            style={{
                              color: "white",
                              flex: 1,
                              textAlign: "right",
                            }}
                          >
                            Off Plan
                          </label>
                        </div>
                      </div>
                      {manageFields ? (
                        <>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="companyName"
                              className="form-control"
                              placeholder="Development name"
                              value={formData.companyName || ""}
                              onChange={handleInputChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="ApartmentName"
                              className="form-control"
                              placeholder="Project name"
                              value={formData.ApartmentName || ""}
                              onChange={handleInputChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <select
                              name="area"
                              className="form-select"
                              value={formData.area || ""}
                              onChange={handleInputChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            >
                              <option value="">Select area</option>
                              <option value="Jumeirah">Jumeirah</option>
                              <option value="Palm Jumeirah">
                                Palm Jumeirah
                              </option>
                              <option value="Madinat Jumeirah">
                                Madinat Jumeirah
                              </option>
                              <option value="Business Bay">Business Bay</option>
                              <option value="Dubai Land Residence Complex">
                                Dubai Land Residence Complex
                              </option>
                              <option value="Downtown Dubai">
                                Downtown Dubai
                              </option>
                              <option value="Dubai Marina">Dubai Marina</option>
                              <option value="Arabian Ranches">
                                Arabian Ranches
                              </option>
                              <option value="Al Barsha">Al Barsha</option>
                              <option value="Deira">Deira</option>
                              <option value="Al Qusais">Al Qusais</option>
                              <option value="Dubai Sports City">
                                Dubai Sports City
                              </option>
                              <option value="Emirates Hills">
                                Emirates Hills
                              </option>
                              <option value="Mohammed Bin Rashid City">
                                Mohammed Bin Rashid City
                              </option>
                              <option value="Jumeirah Islands">
                                Jumeirah Islands
                              </option>
                              <option value="Jebel Ali">Jebel Ali</option>
                              <option value="Al Warqa">Al Warqa</option>
                              <option value="Dubai Media City">
                                Dubai Media City
                              </option>
                              <option value="Dubai Internet City">
                                Dubai Internet City
                              </option>
                              <option value="Nad Al Sheba">Nad Al Sheba</option>
                              <option value="Mirdif">Mirdif</option>
                              <option value="Al Safa">Al Safa</option>
                            </select>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="CurrentLocation"
                              value={formData.CurrentLocation || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Current Location"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>

                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <select
                              name="Owner"
                              className="form-select"
                              value={formData.Owner} // Bind value to formData.Owner
                              onChange={handleInputChange} // Call handleInputChange on change
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            >
                              <option value="">Select Owner</option>
                              <option value="Free Hold">Free Hold</option>
                              <option value="Leasing Hold">Leasing Hold</option>
                            </select>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="NearBy"
                              value={formData.NearBy || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Near By"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            {file && file.length > 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "10px",
                                }}
                              >
                                {file.map((imgObj, idx) => (
                                  <div
                                    key={imgObj.id}
                                    style={{
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                  >
                                    <img
                                      src={IMG_API_BASE_URL + imgObj.path}
                                      alt={`Property ${idx + 1}`}
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        marginRight: "8px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteImg(imgObj.id)}
                                      style={{
                                        position: "absolute",
                                        top: "2px",
                                        right: "10px",
                                        background: "rgba(255,255,255,0.8)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "24px",
                                        height: "24px",
                                        cursor: "pointer",
                                        color: "#c00",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        lineHeight: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 0,
                                      }}
                                      aria-label="Delete image"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}

                                <label
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "8px",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      background: "#decaaf",
                                      color: "#3c2415",
                                      fontSize: "2rem",
                                      textAlign: "center",
                                      lineHeight: "40px",
                                      border: "2px solid #3c2415",
                                    }}
                                  >
                                    +
                                  </span>
                                  <input
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleAddMoreImages}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <textarea
                              className="form-control"
                              placeholder="Overview"
                              name="Overview"
                              value={formData.Overview || ""}
                              onChange={handleInputChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                                height: "100px",
                                resize: "none",
                              }}
                            />
                          </div>

                          <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12">
                            <label
                              style={{ color: "white", marginBottom: "10px" }}
                            >
                              Select Facilities:
                            </label>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                marginBottom: "20px",
                              }}
                            >
                              {data.map((facility) => (
                                <div
                                  key={facility.id} // Use facility ID as key
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "150px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    id={`facility${facility.id}`} // Unique ID
                                    value={facility.id} // Save ID instead of name
                                    checked={formData.Facilities.includes(
                                      facility.id
                                    )} // <-- check by name
                                    onChange={(e) =>
                                      handleCheckboxChange(e, "Facilities")
                                    }
                                  />
                                  <label
                                    htmlFor={`facility${facility.id}`}
                                    style={{
                                      color: "white",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    {facility.facility}{" "}
                                    {/* Show name as label */}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12">
                            <label
                              style={{ color: "white", marginBottom: "10px" }}
                            >
                              Select Features:
                            </label>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                marginBottom: "20px",
                              }}
                            >
                              {dataFeatures.map((feature) => (
                                <div
                                  key={feature.id} // Use facility ID as key
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "150px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    id={`feature${feature.id}`} // Unique ID
                                    value={feature.id} // Save ID instead of name
                                    checked={formData.Features.includes(
                                      feature.id
                                    )} // <-- check by name
                                    onChange={(e) =>
                                      handleCheckboxChange(e, "Features")
                                    }
                                  />
                                  <label
                                    htmlFor={`feature${feature.id}`}
                                    style={{
                                      color: "white",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    {feature.feature} {/* Show name as label */}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <select
                              name="propertyType"
                              className="form-select"
                              value={formData.propertyType}
                              onChange={handleInputChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            >
                              <option value="">Select property type</option>
                              <option value="Apartment">Apartment</option>
                              <option value="Studio">Studio</option>
                              <option value="Duplex">Duplex</option>
                              <option value="Penthouse">Penthouse</option>
                              <option value="Serviced">Serviced</option>
                              <option value="Villa Apartment">Villa</option>
                              <option value="Loft Apartment">Loft</option>
                              <option value="Row Houses">Row Houses</option>
                            </select>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="BedroomSize"
                              value={formData.BedroomSize || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Bedroom Capacity"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="BathroomSize"
                              value={formData.BathroomSize || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Bathroom Capacity"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="Grage"
                              value={formData.Grage || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Grage Capacity"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <input
                              type="text"
                              name="YearOfCompletion"
                              value={formData.YearOfCompletion || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Year Of Completion Of project"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
                            <div className="table-responsive">
                              <table className="table table-striped">
                                <thead className="table-secondary">
                                  <tr>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Area</th>
                                    <th scope="col">Starting Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map((row, index) => (
                                    <tr key={index}>
                                      <td>
                                        <input
                                          type="text"
                                          name="unit"
                                          placeholder="Enter Unit"
                                          value={row.unit}
                                          onChange={(e) =>
                                            handleChange(index, e)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="areaSQft"
                                          placeholder="Enter Area"
                                          value={row.areaSQft}
                                          onChange={(e) =>
                                            handleChange(index, e)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="price"
                                          placeholder="Enter Price"
                                          value={row.price}
                                          onChange={(e) =>
                                            handleChange(index, e)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <button
                                type="button"
                                className="btn btn-primary mt-2"
                                onClick={addRow}
                              >
                                Add Row
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ height: "100%", minHeight: "300px" }}>
                            <div className="row">
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                <input
                                  type="text"
                                  name="ApartmentName"
                                  className="form-control"
                                  placeholder="Apartment name"
                                  value={formData.ApartmentName || ""}
                                  onChange={handleInputChange}
                                  style={{
                                    marginBottom: "20px",
                                    marginTop: "15px",
                                  }}
                                />
                              </div>
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                <select
                                  name="propertyType"
                                  className="form-select"
                                  value={formData.propertyType}
                                  onChange={handleInputChange}
                                  style={{
                                    marginBottom: "20px",
                                    marginTop: "15px",
                                  }}
                                >
                                  <option value="">Select property type</option>
                                  <option value="1RK">1RK</option>
                                  <option value="1BHK">1BHK</option>
                                  <option value="2BHK">2BHK</option>
                                  <option value="3BHK">3BHK</option>
                                  <option value="4BHK">4BHK</option>
                                  <option value="Studio Apartment">
                                    Studio Apartment
                                  </option>
                                  <option value="Duplex Apartment">
                                    Duplex Apartment
                                  </option>
                                  <option value="Penthouse">Penthouse</option>
                                  <option value="Serviced Apartment">
                                    Serviced Apartment
                                  </option>
                                  <option value="Villa Apartment">
                                    Villa Apartment
                                  </option>
                                  <option value="Loft Apartment">
                                    Loft Apartment
                                  </option>
                                  <option value="Row Houses">Row Houses</option>
                                </select>
                              </div>
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                <select
                                  name="area"
                                  className="form-select"
                                  value={formData.area}
                                  onChange={handleInputChange}
                                  style={{
                                    marginBottom: "20px",
                                    marginTop: "15px",
                                  }}
                                >
                                  <option value="">Select area</option>
                                  <option value="Jumeirah">Jumeirah</option>
                                  <option value="Palm Jumeirah">
                                    Palm Jumeirah
                                  </option>
                                  <option value="Madinat Jumeirah">
                                    Madinat Jumeirah
                                  </option>
                                  <option value="Business Bay">
                                    Business Bay
                                  </option>
                                  <option value="Downtown Dubai">
                                    Downtown Dubai
                                  </option>
                                  <option value="Dubai Marina">
                                    Dubai Marina
                                  </option>
                                  <option value="Arabian Ranches">
                                    Arabian Ranches
                                  </option>
                                  <option value="Al Barsha">Al Barsha</option>
                                  <option value="Deira">Deira</option>
                                  <option value="Al Qusais">Al Qusais</option>
                                  <option value="Dubai Sports City">
                                    Dubai Sports City
                                  </option>
                                  <option value="Emirates Hills">
                                    Emirates Hills
                                  </option>
                                  <option value="Mohammed Bin Rashid City">
                                    Mohammed Bin Rashid City
                                  </option>
                                  <option value="Jumeirah Islands">
                                    Jumeirah Islands
                                  </option>
                                  <option value="Jebel Ali">Jebel Ali</option>
                                  <option value="Al Warqa">Al Warqa</option>
                                  <option value="Dubai Media City">
                                    Dubai Media City
                                  </option>
                                  <option value="Dubai Internet City">
                                    Dubai Internet City
                                  </option>
                                  <option value="Nad Al Sheba">
                                    Nad Al Sheba
                                  </option>
                                  <option value="Mirdif">Mirdif</option>
                                  <option value="Al Safa">Al Safa</option>
                                </select>
                              </div>
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                {file && file.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {file.map((imgObj, idx) => (
                                      <div
                                        key={imgObj.id}
                                        style={{
                                          position: "relative",
                                          display: "inline-block",
                                        }}
                                      >
                                        <img
                                          src={IMG_API_BASE_URL + imgObj.path}
                                          alt={`Property ${idx + 1}`}
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                            marginRight: "8px",
                                            borderRadius: "8px",
                                            border: "1px solid #ccc",
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDeleteImg(imgObj.id)
                                          }
                                          style={{
                                            position: "absolute",
                                            top: "2px",
                                            right: "10px",
                                            background: "rgba(255,255,255,0.8)",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                            color: "#c00",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            lineHeight: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 0,
                                          }}
                                          aria-label="Delete image"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}

                                    <label
                                      style={{
                                        cursor: "pointer",
                                        marginLeft: "8px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "inline-block",
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                          background: "#decaaf",
                                          color: "#3c2415",
                                          fontSize: "2rem",
                                          textAlign: "center",
                                          lineHeight: "40px",
                                          border: "2px solid #3c2415",
                                        }}
                                      >
                                        +
                                      </span>
                                      <input
                                        type="file"
                                        multiple
                                        style={{ display: "none" }}
                                        onChange={handleAddMoreImages}
                                      />
                                    </label>
                                  </div>
                                )}
                              </div>
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                <input
                                  type="Text"
                                  name="CurrentLocation"
                                  value={formData.CurrentLocation}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Current Location"
                                  style={{
                                    marginBottom: "20px",
                                    marginTop: "15px",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{
                          color: "black",
                          width: "100%",
                          maxWidth: "150px",
                          backgroundColor: "#decaaf",
                          marginTop: "50px",
                          borderRadius: "14px",
                          border: "2px solid #decaaf",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Price Plan
                      </button>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                          width: "400px",
                        }}
                      >
                        <button
                          style={{
                            color: "black",
                            width: "100%",
                            // maxWidth: "300px",
                            backgroundColor: "#decaaf",
                            marginTop: "50px",
                            border: "2px solid #decaaf",
                          }}
                          onClick={() => navigate("/property")}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          style={{
                            color: "black",
                            width: "100%",
                            // maxWidth: "300px",
                            backgroundColor: "#decaaf",
                            marginTop: "50px",
                            border: "2px solid #decaaf",
                          }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Price Plan
                </h5>
              </div>
              <form onSubmit={HandlePayment}>
                <div
                  className="modal-body"
                  style={{ display: "flex", gap: "30px" }}
                >
                  <div>
                    <label>Payment Plan</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="During construction"
                      value={PriceData.nameOfappt}
                      name="nameOfappt"
                      readOnly
                      style={{ marginBottom: "20px", marginTop: "15px" }}
                    />

                    {manageFields ? (
                      <>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              value={PriceData.onBookingPP}
                              onChange={handlePriceChange}
                              name="onBookingPP"
                              placeholder="On booking"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              name="duringConstructionPP"
                              placeholder="During construction"
                              value={PriceData.duringConstructionPP}
                              onChange={handlePriceChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Upon Handover"
                          name="uponHandoverPP"
                          value={PriceData.uponHandoverPP}
                          onChange={handlePriceChange}
                          style={{ marginBottom: "20px", marginTop: "15px" }}
                        />

                        <div>
                          <label>Post Handover Payment Plan</label>
                          <input
                            type="text"
                            className="form-control"
                            value={PriceData.onBookingHP}
                            onChange={handlePriceChange}
                            name="onBookingHP"
                            placeholder="On booking"
                            style={{ marginBottom: "20px", marginTop: "15px" }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="During construction"
                            name="duringConstructionHP"
                            value={PriceData.duringConstructionHP}
                            onChange={handlePriceChange}
                            style={{ marginBottom: "20px", marginTop: "15px" }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Upon Handover"
                            name="uponHandoverHP"
                            value={PriceData.uponHandoverHP}
                            onChange={handlePriceChange}
                            style={{ marginBottom: "20px", marginTop: "15px" }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Bank"
                              value={PriceData.bank}
                              name="bank"
                              onChange={handlePriceChange}
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                            <input
                              type="text"
                              className="form-control"
                              value={PriceData.cash}
                              name="cash"
                              onChange={handlePriceChange}
                              placeholder="Cash"
                              style={{
                                marginBottom: "20px",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    data-bs-dismiss="modal"
                    style={{
                      color: "black",
                      backgroundColor: "#decaaf",
                      border: "2px solid #decaaf",
                    }}
                  >
                    Submit Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editproperty;
