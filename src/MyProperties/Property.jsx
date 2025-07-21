import React, { useEffect, useState } from "react";
import Navbar from "../homepage/Navbar";
import apartment1 from "../assets/apartment1.jpg";
import apartment2 from "../assets/apartment2.jpg";
import apartment3 from "../assets/apartment3.jpg";
// import building5 from "../assets/building5.jpg";
import Logoimg from "../assets/logo.png";
import building2 from "../assets/building2.jpg";
import building3 from "../assets/building3.jpg";
import building4 from "../assets/building4.jpg";
import GoogleMapComponent from "./Google";
import ComapanyLogo from "../assets/ComapanyLogo.jpg";

import { _get } from "../../services/services_api";
import {
  ALL_IMG,
  API_BASE_URL,
  GET_HOME,
  GET_HOME_BASEROLES,
  IMG_API_BASE_URL,
  PROPERTY_IMG,
} from "../../services/end_points";
import { data, useNavigate } from "react-router-dom";
const Property = () => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [properties, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6; // Adjust this value as needed
  const userId = localStorage.getItem("userId");
  const [ImagePath, setimagePath] = useState([]);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Get current properties to display
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  // const currentProperties = properties.slice(
  //   indexOfFirstProperty,
  //   indexOfLastProperty
  // );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    getPropertyData();
  }, []);

  // Call `fetchImages` only after `properties` has data
  useEffect(() => {
    if (properties && properties.length > 0) {
      fetchImages();
    }
  }, [properties]);

  const getPropertyData = async () => {
    try {
      let result;

      if (userId != null) {
        result = await _get(`${API_BASE_URL}${GET_HOME_BASEROLES}${userId}`);
      } else {
        result = await _get(`${API_BASE_URL}${GET_HOME}`);
      }

      if (result.status === 200) {
        setProperty(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${ALL_IMG}`);
      const images = result?.data?.data || [];

      setimagePath(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value.trim());
  };
  const filteredProperties = properties.filter((property) => {
    return (
      (selectedArea === "" || property.area === selectedArea) &&
      (selectedType === "" || property.type === selectedType)
    );
  });

  const handleButtonClick = (property) => {
    navigate("/property-details", { state: { property } });

    // You can pass the property data to a new route or modal, depending on your application flow.
  };
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "120px" }}>
        <div className="container-fluid mt-5">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 col-md-12">
                <h3>Our Property</h3>
              </div>
              <div className="col-lg-3 col-md-12">
                <select
                  className="form-select"
                  aria-label="Select area"
                  value={selectedArea}
                  onChange={handleAreaChange}
                >
                  <option value="">Select area</option>
                  <option value="Jumeirah">Jumeirah</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Madinat Jumeirah">Madinat Jumeirah</option>
                  <option value="Business Bay">Business Bay</option>
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Arabian Ranches">Arabian Ranches</option>
                  <option value="Al Barsha">Al Barsha</option>
                  <option value="Deira">Deira</option>
                  <option value="Al Qusais">Al Qusais</option>
                  <option value="Dubai Sports City">Dubai Sports City</option>
                  <option value="Emirates Hills">Emirates Hills</option>
                  <option value="Mohammed Bin Rashid City">
                    Mohammed Bin Rashid City
                  </option>
                  <option value="Jumeirah Islands">Jumeirah Islands</option>
                  <option value="Jebel Ali">Jebel Ali</option>
                  <option value="Al Warqa">Al Warqa</option>
                  <option value="Dubai Media City">Dubai Media City</option>
                  <option value="Dubai Internet City">
                    Dubai Internet City
                  </option>
                  <option value="Nad Al Sheba">Nad Al Sheba</option>
                  <option value="Mirdif">Mirdif</option>
                  <option value="Al Safa">Al Safa</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-12">
                <select
                  className="form-select"
                  aria-label="Select property type"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option value="">Select property type</option>
                  <option value="1RK">1RK</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="4BHK">4BHK</option>
                  <option value="Studio Apartment">Studio Apartment</option>
                  <option value="Duplex Apartment">Duplex Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Serviced Apartment">Serviced Apartment</option>
                  <option value="Villa Apartment">Villa Apartment</option>
                  <option value="Loft Apartment">Loft Apartment</option>
                  <option value="Row Houses">Row Houses</option>
                </select>
              </div>
              <div className="container" style={{ marginTop: "50px" }}>
                <div className="container">
                  <div className="row">
                    {filteredProperties
                      .slice(indexOfFirstProperty, indexOfLastProperty)
                      .map((property) => {
                        let imageArray = [];
                        try {
                          // ...existing code...
                          imageArray = ImagePath.filter(
                            (img) => Number(img.homeId) === Number(property.id)
                          ).map((img) => img.images);
                          // ...existing code...
                        } catch (error) {
                          console.error("Error filtering ImagePath:", error);
                        }

                        const baseUrl = `${IMG_API_BASE_URL}`;

                        const imageUrl =
                          imageArray.length > 0
                            ? `${baseUrl}${imageArray[0]}`
                            : `${building2}`;

                        return (
                          <div
                            className="col-lg-4 col-md-6 col-sm-12 mb-4"
                            key={property.id}
                          >
                            <div
                              className="card h-100"
                              style={{
                                borderRadius: "20px",
                              }}
                            >
                              <div className="card-body d-flex flex-column align-items-center">
                                <img
                                  src={imageUrl}
                                  className="img-fluid"
                                  alt={property.ApartmentName}
                                  style={{
                                    height: "250px",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                                <h3
                                  className="mt-3 text-center"
                                  style={{ color: "#3c2415" }}
                                >
                                  {property.ApartmentName}
                                </h3>
                                <div className="d-flex justify-content-around w-100 mt-2 flex-wrap">
                                  <div className="d-flex align-items-center">
                                    <i className="bi bi-geo-alt me-2"></i>
                                    <span>{property.area}</span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <i className="bi bi-arrows-fullscreen me-2"></i>
                                    <span>1200sq</span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <i className="bi bi-pencil-square me-2"></i>
                                    <span>
                                      {property.selectPlan === 0
                                        ? "Ready"
                                        : "OffPlan"}
                                    </span>
                                  </div>
                                </div>
                                <hr className="w-100" />
                                <button
                                  className="btn w-100"
                                  style={{
                                    // backgroundColor: "#3c2415",
                                    backgroundColor: "#4a4a4a",
                                    color: "white",
                                    // border: "2px solid #decaaf",
                                    border: "2px solid #4a4a4a",
                                    borderRadius: "12px",
                                  }}
                                  onClick={() => handleButtonClick(property)}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      style={{
                        marginRight: "10px",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        border: "1px solid #3c2415",
                        backgroundColor: currentPage === 1 ? "#ccc" : "#3c2415",
                        color: "white",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      Previous
                    </button>
                    <span
                      style={{
                        margin: "0 15px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "8px 15px",
                        borderRadius: "5px",
                        border: "1px solid #3c2415",
                        backgroundColor:
                          currentPage === totalPages ? "#ccc" : "#3c2415",
                        color: "white",
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "100px",
            backgroundColor: "#4A4A4A",
            height: "100%",
          }}
        >
          <div className="container">
            <div className="row">
              <div
                className="container mt-0"
                style={{
                  padding: "20px 0",
                  color: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={ComapanyLogo}
                    alt="Company Logo"
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <ul
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    listStyle: "none",
                    padding: 0,
                    marginTop: "20px",
                  }}
                >
                  <a
                    href="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <li style={{ margin: "0 15px", cursor: "pointer" }}>
                      Home
                    </li>
                  </a>
                  <a
                    href="/property"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <li style={{ margin: "0 15px", cursor: "pointer" }}>
                      Property
                    </li>
                  </a>
                  <a
                    href="/about-us"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <li style={{ margin: "0 15px", cursor: "pointer" }}>
                      About Us
                    </li>
                  </a>
                  <a
                    href="/contact"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <li style={{ margin: "0 15px" }}>Contact</li>
                  </a>
                </ul>
                <hr style={{ borderColor: "white", margin: "30px 0" }} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 50px",
                    flexWrap: "wrap",
                  }}
                >
                  <p>📞 +971509866679</p>
                  <p>✉️ smartplan.re@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Property;
{
  /* <div>
                                  <i
                                    className="bi bi-house-door"
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "30px",
                                    }}
                                  ></i>
                                  <span style={{ fontSize: "18px" }}>
                                    {property.propertyType || "N/A"}
                                  </span>
                                </div> */
}
