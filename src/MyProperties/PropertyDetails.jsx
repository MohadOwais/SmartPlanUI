import React, { useEffect, useState } from "react";
import Navbar from "../homepage/Navbar";
import Logoimg from "../assets/logo.png";
import ComapanyLogo from "../assets/ComapanyLogo.jpg";
import Apartmenticons from "../assets/Apartmenticons.png";
import BathroomIcons from "../assets/BathroomIcons.png";
import SudioIcons from "../assets/SudioIcons.png";
import GrageIcons from "../assets/GrageIcons.png";
import locationsicons from "../assets/locationsicons.png";
import CalenderIcons from "../assets/CalenderIcons.png";
import SecurityIcons from "../assets/Security.png";
import ClubhouseIcons from "../assets/Clubhouse.png";
import ParkingIcons from "../assets/Parking.png";
import PlaygroundIcons from "../assets/Playground.png";
import GYMICONS from "../assets/gymIcons.jpg";
import SwimmingPool from "../assets/SwimmingPool.jpg";

import GoogleMapEmbed from "./Google";
import { useLocation } from "react-router-dom";
import { _get, _post } from "../../services/services_api";
import {
  ADD_HOME_LIST,
  ALL_FACILITY_FEATURES,
  API_BASE_URL,
  GET_PRICE,
  IMG_API_BASE_URL,
  PROPERTY_IMG,
} from "../../services/end_points";
const PropertyDetails = () => {
  const location = useLocation();
  const { property } = location.state;

  const [pricePlan, setPricePlan] = useState();
  const [carouselImages, setCarouselImages] = useState([]);
  const [formdata, setFormData] = useState({
    selectPlan: property.selectPlan,
    company_name: property.companyName,
    project_name: property.ApartmentName,
    name: "",
    email: "",
    number: "",
    userId: property.UserName,
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allpropertyFacilities, setAllpropertyFacilities] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const baseUrl = `${IMG_API_BASE_URL}`;
  // const baseUrl = "https://smartplan-be.vercel.app";
  const fetchdata = async () => {
    try {
      const result = await _get(
        `${API_BASE_URL}${GET_PRICE}${property.ApartmentName}`
      );
      if (result.status === 200) {
        setPricePlan(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching price plan:", error);
    }
  };
  const fetchAllData = async () => {
    try {
      const result = await _get(
        `${API_BASE_URL}${ALL_FACILITY_FEATURES}${property.id}`
      );

      if (result.status === 200) {
        setAllpropertyFacilities(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching price plan:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await _get(
          `${API_BASE_URL}${PROPERTY_IMG}${property.id}`
        );
        const images = result?.data?.data || [];
        setCarouselImages(images);
        fetchdata();
        fetchAllData();
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [property.id]);

  const handleSubmitListing = async () => {
    try {
      const result = await _post(`${API_BASE_URL}${ADD_HOME_LIST}`, formdata);
      if (result.status === 200) {
        setFormData({
          company_name: "",
          project_name: "",
          name: "",
          email: "",
          number: "",
        });
      }
    } catch (error) {}
  };
  const FacilityImg = [
    {
      name: "GYM",
      image: GYMICONS,
    },
    {
      name: "Swimming Pool",
      image: SwimmingPool,
    },
    {
      name: "Security",
      image: SecurityIcons,
    },
    {
      name: "Clubhouse",
      image: ClubhouseIcons,
    },
    {
      name: "Playground",
      image: PlaygroundIcons,
    },
    {
      name: "Parking",
      image: ParkingIcons,
    },
  ];
  console.log(" pricePlan[0].selectPlan === 0 ", formdata.selectPlan);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ marginTop: "120px" }}>
        <div className="container-fluid mt-5">
          {pricePlan &&
          pricePlan.length > 0 &&
          pricePlan[0].selectPlan === 1 ? (
            <>
              <div className="container">
                <div className="row mt-5">
                  <div className="col-lg-12 col-md-12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h2>{property.ApartmentName}</h2>
                        <div style={{ display: "flex", gap: "3px" }}>
                          <i className="bi bi-geo-alt">{property.area} Dubai</i>
                        </div>
                      </div>
                      <h5>{property.selectPlan === 0 ? "Ready" : "OffPlan"}</h5>
                    </div>

                    <div
                      className="card"
                      style={{
                        width: "100%",

                        marginTop: "20px",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <div
                              id="propertyImageCarouselMain"
                              className="carousel slide"
                              data-bs-ride="carousel"
                              data-bs-interval="3000" // 3 seconds per slide
                            >
                              <div className="carousel-inner">
                                {carouselImages.length > 0 ? (
                                  carouselImages.map((image, index) => (
                                    <div
                                      key={index}
                                      className={`carousel-item ${
                                        index === 0 ? "active" : ""
                                      }`}
                                    >
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "500px",
                                          objectFit: "cover",
                                          borderRadius: "10px",
                                        }}
                                        src={`${baseUrl}${image.images}`}
                                        alt={`Property Image ${index + 1}`}
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="carousel-item active">
                                    <p>No Image Available</p>
                                  </div>
                                )}
                              </div>
                              {carouselImages.length > 1 && (
                                <>
                                  <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#propertyImageCarouselMain"
                                    data-bs-slide="prev"
                                  >
                                    <span
                                      className="carousel-control-prev-icon"
                                      aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                      Previous
                                    </span>
                                  </button>
                                  <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#propertyImageCarouselMain"
                                    data-bs-slide="next"
                                  >
                                    <span
                                      className="carousel-control-next-icon"
                                      aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                      Next
                                    </span>
                                  </button>
                                </>
                              )}
                              <div className="carousel-indicators">
                                {carouselImages.map((_, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#propertyImageCarouselMain"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                    aria-current={
                                      index === 0 ? "true" : "false"
                                    }
                                    aria-label={`Slide ${index + 1}`}
                                  ></button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3>Overview</h3>
                        <div className="row mt-5 p-3  rounded text-center">
                          <div className="col-md-2 d-flex flex-column align-items-center">
                            {/* <i className="bi bi-house-door-fill  fs-1"></i> */}
                            <img
                              src={Apartmenticons}
                              alt="Apartmenticons"
                              style={{ height: "80px" }}
                            />

                            <span className="fw-bold">
                              {property.propertyType}
                            </span>
                          </div>
                          <div className="col-md-2 d-flex flex-column align-items-center">
                       
                            <img
                              src={BathroomIcons}
                              alt="BathroomIcons"
                              style={{ height: "80px" }}
                            />
                            <span className="fw-bold">
                              {property.BathRoomSize}
                            </span>
                          </div>
                          <div className="col-md-2 d-flex flex-column align-items-center">
                            {/* <i
                              className="bi bi-door-closed-fill  fs-1"
                              style={{ color: "black" }}
                            ></i> */}
                            <img
                              src={SudioIcons}
                              alt="SudioIcons"
                              style={{ height: "80px" }}
                            />
                            <span className="fw-bold">
                              {property.BedRoomSize}
                            </span>
                          </div>
                          <div className="col-md-2 d-flex flex-column align-items-center">
                            {/* <i
                              className="bi bi-car-front-fill s fs-1"
                              style={{ color: "#c0b8b8" }}
                            ></i> */}
                            <img
                              src={GrageIcons}
                              alt="GrageIcons"
                              style={{ height: "80px" }}
                            />
                            <span className="fw-bold">{property.Grage}</span>
                          </div>
                          <div className="col-md-2 d-flex flex-column align-items-center">
                            <img
                              src={CalenderIcons}
                              alt="CalenderIcons"
                              style={{ height: "80px" }}
                            />

                            <span className="fw-bold">
                              {property.YearOfCompletion}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-8 col-md-12 mt-5">
                            <h2>Description</h2>
                            <div className="container mt-4"></div>
                            <p>
                              {" "}
                              {property.Overview === "null" ||
                              property.Overview === null
                                ? "SmartPlan is a forward-thinking company dedicated to providing innovative business solutions that enhance efficiency and drive growth. With a focus on cutting-edge technology, strategic planning, and customer-centric approaches, we empower businesses to achieve their goals seamlessly.Our expertise spans multiple industries, offering tailored solutions in business management, automation, and digital transformation. At SmartPlan, we believe in smart strategies, streamlined processes, and sustainable success. Our commitment to excellence ensures that our clients stay ahead in a competitive market."
                                : property.Overview}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-12">
                            <div
                              // className="card"
                              style={{
                                marginTop: "20px",
                                borderRadius: "20px",
                                maxWidth: "400px",
                                height: "400px",
                              }}
                            >
                              <div>
                                <GoogleMapEmbed
                                  data={property.CurrentLocation}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row mt-5">
                            <h2>Property Details</h2>
                            <div className="col-lg-12 col-md-12 mt-4">
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "20px",
                                }}
                              >
                                {allpropertyFacilities && (
                                  <div className="col-lg-12 col-md-12 mt-4">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "20px",
                                        width: "100%",
                                        justifyContent: "flex-start", // or "center"
                                      }}
                                    >
                                      {[
                                        ...new Set(
                                          allpropertyFacilities.map(
                                            (item) => item.FacilityName
                                          )
                                        ),
                                      ].map((facility) => (
                                        <div
                                          key={facility}
                                          style={{
                                            flex: "1 1 180px",
                                            minWidth: "140px",
                                            maxWidth: "120px",
                                          }}
                                        >
                                          <div
                                            className="card property-card text-center"
                                            style={{ height: "80%" }}
                                          >
                                            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                              {(() => {
                                                // Find the image for the current facility
                                                const facilityObj =
                                                  FacilityImg.find(
                                                    (f) =>
                                                      f.name.toLowerCase() ===
                                                      facility.toLowerCase()
                                                  );
                                                if (facilityObj) {
                                                  return (
                                                    <img
                                                      src={facilityObj.image}
                                                      alt={facilityObj.name}
                                                      style={{
                                                        height: "40px",
                                                        width: "40px",
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                  );
                                                } else {
                                                  // fallback if not found
                                                  return (
                                                    <span
                                                      style={{
                                                        display: "inline-block",
                                                        width: "40px",
                                                        height: "40px",
                                                        background: "#eee",
                                                        borderRadius: "50%",
                                                        lineHeight: "40px",
                                                      }}
                                                    >
                                                      ?
                                                    </span>
                                                  );
                                                }
                                              })()}
                                              <h6 className="mt-2">
                                                {facility}
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row">
                            <div className="col-lg-6 col-md-12">
                              <div className="col-lg-8 col-md-12 mt-5">
                                <ul>
                                  {property.NearBy &&
                                  property.NearBy.split(",").length > 1 ? (
                                    <>
                                      <h4>Near By</h4>
                                      <div style={{ display: "flex" }}>
                                        <ul style={{ flex: 1 }}>
                                          {property.NearBy.split(",")
                                            .slice(0, 5) // Get first 5 items
                                            .map((place, index) => (
                                              <li key={index}>
                                                {place.trim()}
                                              </li>
                                            ))}
                                        </ul>
                                        <ul
                                          style={{
                                            flex: 1,
                                          }}
                                        >
                                          {property.NearBy.split(",")
                                            .slice(5) // Get the remaining items from index 6 onward
                                            .map((place, index) => (
                                              <li key={index}>
                                                {place.trim()}
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </ul>
                              </div>
                              <div className="mt-5">
                                <h4>Payment Plan</h4>
                                <table className="table table-striped">
                                  <thead className="table-secondary">
                                    <tr>
                                      {pricePlan &&
                                      pricePlan.length > 0 &&
                                      pricePlan[0].selectPlan === 0 ? (
                                        <>
                                          <th>Bank</th>
                                          <th>Cash</th>
                                        </>
                                      ) : (
                                        pricePlan &&
                                        pricePlan.length > 0 && (
                                          <>
                                            <th>On Booking</th>
                                            <th>During Construction</th>
                                            <th>Upon Handover</th>
                                          </>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pricePlan &&
                                    pricePlan.length > 0 &&
                                    pricePlan[0].selectPlan === 0 ? (
                                      <tr>
                                        <td>{pricePlan[0].bank || "N/A"}</td>
                                        <td>{pricePlan[0].cash || "N/A"}</td>
                                      </tr>
                                    ) : (
                                      pricePlan &&
                                      pricePlan.length > 0 && (
                                        <tr>
                                          <td>
                                            {pricePlan[0].onBookingPricePlan ||
                                              "N/A"}
                                          </td>
                                          <td>
                                            {pricePlan[0]
                                              .DuringConstructionPricePlan ||
                                              "N/A"}
                                          </td>
                                          <td>
                                            {pricePlan[0]
                                              .UponHandoverPricePlan || "N/A"}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              {pricePlan &&
                              pricePlan.length > 0 &&
                              pricePlan[0].UponHandoverPostHandover ? (
                                <div className="mt-5">
                                  <h4>Handover Payment Plan</h4>
                                  <table className="table table-striped">
                                    <thead className="table-secondary">
                                      <tr>
                                        <th>On Booking</th>
                                        <th>During Construction</th>
                                        <th>Upon Handover</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          {pricePlan[0]
                                            .UponHandoverPostHandover || "-"}
                                        </td>
                                        <td>
                                          {pricePlan[0]
                                            .DuringConstructionPricePlan ||
                                            "N/A"}
                                        </td>
                                        <td>
                                          {pricePlan[0]
                                            .UponHandoverPostHandover || "-"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              ) : null}
                            </div>

                            <div className="col-lg-6 col-md-12">
                              <div
                                style={{
                                  width: "100%",
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      width: "100%",
                                      marginTop: "20px",
                                      borderRadius: "20px",
                                      padding: "20px",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          width: "100%",
                                          // maxHeight: "650px",
                                          backgroundColor: "#3c2415",
                                          padding: "20px",
                                          borderRadius: "10px",
                                          flexDirection: "column",
                                          color: "white",
                                        }}
                                      >
                                        <div style={{ textAlign: "center" }}>
                                          <h3>Price</h3>
                                          <h4>500 AED</h4>
                                        </div>
                                        <hr />

                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Full Name"
                                          style={{ marginBottom: "15px" }}
                                          name="name"
                                          value={formdata.name}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formdata,
                                              name: e.target.value,
                                            })
                                          }
                                        />

                                        <input
                                          type="email"
                                          className="form-control"
                                          placeholder="Email"
                                          name="email"
                                          value={formdata.email}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formdata,
                                              email: e.target.value,
                                            })
                                          }
                                          style={{ marginBottom: "15px" }}
                                        />
                                        <input
                                          type="tel"
                                          className="form-control"
                                          placeholder="Phone number"
                                          name="number"
                                          value={formdata.number}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formdata,
                                              number: e.target.value,
                                            })
                                          }
                                          style={{ marginBottom: "15px" }}
                                        />

                                        <div style={{ textAlign: "center" }}>
                                          <button
                                            style={{
                                              color: "black",
                                              width: "100%",
                                              backgroundColor: "#decaaf",
                                              border: "2px solid #decaaf",
                                              padding: "10px",
                                            }}
                                            onClick={handleSubmitListing}
                                          >
                                            Book Now
                                          </button>
                                        </div>
                                        <div
                                          style={{
                                            textAlign: "center",
                                            marginTop: "20px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: "120px",
                                              height: "120px",
                                              borderRadius: "50%",
                                              overflow: "hidden",
                                              margin: "auto",
                                              backgroundColor: "white",
                                            }}
                                          >
                                            <img
                                              src={ComapanyLogo}
                                              alt="logo img"
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                              }}
                                            />
                                          </div>

                                          <h5>Smart Plan Real Estate</h5>
                                          <hr />
                                          <h6>Real Estate</h6>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              gap: "10px",
                                            }}
                                          >
                                            <i className="bi bi-envelope"></i>
                                            <span>info@abcabc.com</span>
                                            <i className="bi bi-telephone"></i>
                                            <span>+912345678</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="container">
                <div className="row mt-5">
                  <div className="col-lg-12 col-md-12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h2>{property.ApartmentName}</h2>
                        <div style={{ display: "flex", gap: "3px" }}>
                          <i className="bi bi-geo-alt">{property.area} Dubai</i>
                        </div>
                      </div>
                      <h5>
                        {property.selectPlan === 0 ? "Ready Plan" : "OffPlan"}
                      </h5>
                    </div>

                    <div
                      className="card"
                      style={{
                        width: "100%",
                        // maxWidth: "600px",
                        // height: "100%",
                        marginTop: "20px",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div
                              className="modal-content"
                              // style={{ height: "100%", maxHeight: "1000px" }}
                            >
                              <div
                                className="modal-body"
                                style={
                                  {
                                    // height: "auto",
                                    // overflowY: "auto",
                                  }
                                }
                              >
                                <div
                                  id="carouselExampleControls"
                                  className="carousel slide"
                                  data-bs-ride="carousel"
                                  data-bs-interval="8000"
                                >
                                  <div className="carousel-inner">
                                    {carouselImages.map((image, index) => {
                                      const isActive = index === 0; // First image should be active
                                      return (
                                        <div
                                          key={index}
                                          className={`carousel-item ${
                                            isActive ? "active" : ""
                                          }`}
                                        >
                                          <img
                                            style={{
                                              width: "100%",
                                              height: "auto", // Set height for images
                                              objectFit: "cover", // Ensure images cover space properly
                                            }}
                                            src={`${baseUrl}${image?.images}`} // Use `image.images`
                                            alt={`Slide ${index + 1}`}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide="prev"
                                  >
                                    <span
                                      className="carousel-control-prev-icon"
                                      aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                      Previous
                                    </span>
                                  </button>
                                  <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide="next"
                                  >
                                    <span
                                      className="carousel-control-next-icon"
                                      aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                      Next
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* {carouselImages?.[0]?.images ? (
                              <img
                                style={{
                                  width: "100%",
                                  height: "400px",
                                }}
                                src={`${baseUrl}${carouselImages[0].images}`}
                                alt="First Image"
                              />
                            ) : (
                              <p>No Image Available</p>
                            )} */}
                          </div>
                          {/* <div className="col-lg-6 col-md-12">
                            {carouselImages?.[1]?.images ? (
                              <img
                                style={{
                                  width: "100%",
                                  height: "300px",
                                }}
                                src={`${baseUrl}${carouselImages[1].images}`}
                                alt="Second Image"
                              />
                            ) : (
                              <p>No Image Available</p>
                            )}
                            {carouselImages?.[2]?.images ? (
                              <img
                                style={{
                                  width: "100%",
                                  height: "300px",
                                }}
                                src={`${baseUrl}${carouselImages[2].images}`}
                                alt="Third Image"
                              />
                            ) : (
                              <p>No Image Available</p>
                            )}
                          </div> */}

                          {isPopupOpen && (
                            <div
                              className={`modal fade ${
                                isPopupOpen ? "show d-block" : ""
                              }`}
                              // tabIndex="-1"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered modal-dialog-scrollable`  "
                                style={
                                  {
                                    // width: "100%",
                                    // minWidth: "600px", // Increase width (adjust as needed)
                                    // maxWidth: "1800px",
                                    // maxHeight: "1600px",
                                    // minHeight: "500px", // Set a max-width if needed
                                    // justifyContent: "center",
                                  }
                                }
                              >
                                <div
                                  className="modal-content"
                                  // style={{ height: "100%", maxHeight: "1000px" }}
                                >
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Popup Content
                                    </h5>
                                  </div>
                                  <div
                                    className="modal-body"
                                    style={
                                      {
                                        // height: "auto",
                                        // overflowY: "auto",
                                      }
                                    }
                                  >
                                    <div
                                      id="carouselExampleControls"
                                      className="carousel slide"
                                      data-bs-ride="carousel"
                                      data-bs-interval="8000"
                                    >
                                      <div className="carousel-inner">
                                        {carouselImages.map((image, index) => {
                                          const isActive = index === 0; // First image should be active
                                          return (
                                            <div
                                              key={index}
                                              className={`carousel-item ${
                                                isActive ? "active" : ""
                                              }`}
                                            >
                                              <img
                                                style={{
                                                  width: "100%",
                                                  height: "auto", // Set height for images
                                                  objectFit: "cover", // Ensure images cover space properly
                                                }}
                                                src={`${baseUrl}${image?.images}`} // Use `image.images`
                                                alt={`Slide ${index + 1}`}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleControls"
                                        data-bs-slide="prev"
                                      >
                                        <span
                                          className="carousel-control-prev-icon"
                                          aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">
                                          Previous
                                        </span>
                                      </button>
                                      <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleControls"
                                        data-bs-slide="next"
                                      >
                                        <span
                                          className="carousel-control-next-icon"
                                          aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">
                                          Next
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      className="btn btn-secondary"
                                      onClick={togglePopup}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-12">
                            <div>
                              <h2>Property Details</h2>
                              <div className="col-lg-12 col-md-12 mt-4">
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                  }}
                                >
                                  <div
                                    className="card property-card"
                                    style={{ width: "200px" }}
                                  >
                                    <div className="card-body">
                                      <img
                                        src={locationsicons}
                                        style={{ height: "50px" }}
                                      />
                                      <span
                                        style={{
                                          fontSize: "12px",
                                        }}
                                      >
                                        {property.area}
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    className="card property-card"
                                    style={{ width: "200px" }}
                                  >
                                    <div className="card-body">
                                      <img
                                        src={SudioIcons}
                                        alt="SudioIcons"
                                        style={{ height: "60px" }}
                                      />
                                      <span>2BHK</span>
                                    </div>
                                  </div>
                                  {property.Facilities &&
                                  property.Facilities.split(",").length > 1 ? (
                                    property.Facilities.split(",").map(
                                      (facility) => (
                                        <div
                                          className="card property-card"
                                          key={facility}
                                        >
                                          <div className="card-body">
                                            <i
                                              className={`bi ${
                                                facility === "Parking"
                                                  ? "bi-p-circle"
                                                  : facility === "Swimming Pool"
                                                  ? "bi-water"
                                                  : facility === "Security"
                                                  ? "bi-shield-lock"
                                                  : facility === "Clubhouse"
                                                  ? "bi-house-door"
                                                  : facility === "Playground"
                                                  ? "bi-tree"
                                                  : ""
                                              }`}
                                              style={{
                                                fontSize: "40px",
                                              }}
                                            ></i>
                                            <h6>{facility}</h6>
                                          </div>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <></> // Renders nothing if facilities are empty or <= 1
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-5">
                              <h4>Payment Plan</h4>
                              <table className="table table-striped">
                                <thead className="table-secondary">
                                  <tr>
                                    {pricePlan &&
                                    pricePlan.length > 0 &&
                                    pricePlan[0].selectPlan === 0 ? (
                                      <>
                                        <th>Bank</th>
                                        <th>Cash</th>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {pricePlan &&
                                  pricePlan.length > 0 &&
                                  pricePlan[0].selectPlan === 0 ? (
                                    <tr>
                                      <td>{pricePlan[0].bank || "-"}</td>
                                      <td>{pricePlan[0].cash || "N/A"}</td>
                                    </tr>
                                  ) : (
                                    <></>
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div>
                              <div
                                // className="card"
                                style={{
                                  marginTop: "20px",
                                  borderRadius: "20px",
                                  maxWidth: "100%",
                                  height: "100%",
                                  // maxHeight: "200px",
                                }}
                              >
                                <div>
                                  <GoogleMapEmbed
                                    data={property.CurrentLocation}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 mt-5">
                            <div
                              style={{
                                width: "100%",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    width: "100%",
                                    marginTop: "20px",
                                    borderRadius: "20px",
                                    padding: "20px",
                                  }}
                                >
                                  <div>
                                    <div
                                      style={{
                                        width: "100%",
                                        // maxHeight: "650px",
                                        backgroundColor: "#3c2415",
                                        padding: "20px",
                                        borderRadius: "10px",
                                        flexDirection: "column",
                                        color: "white",
                                      }}
                                    >
                                      <div style={{ textAlign: "center" }}>
                                        <h3>Price</h3>
                                        <h4>500 AED</h4>
                                      </div>
                                      <hr />

                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Full Name"
                                        style={{ marginBottom: "15px" }}
                                        name="name"
                                        value={formdata.name}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formdata,
                                            name: e.target.value,
                                          })
                                        }
                                      />

                                      <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={formdata.email}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formdata,
                                            email: e.target.value,
                                          })
                                        }
                                        style={{ marginBottom: "15px" }}
                                      />
                                      <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Phone number"
                                        name="number"
                                        value={formdata.number}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formdata,
                                            number: e.target.value,
                                          })
                                        }
                                        style={{ marginBottom: "15px" }}
                                      />

                                      <div style={{ textAlign: "center" }}>
                                        <button
                                          style={{
                                            color: "black",
                                            width: "100%",
                                            backgroundColor: "#decaaf",
                                            border: "2px solid #decaaf",
                                            padding: "10px",
                                          }}
                                          onClick={handleSubmitListing}
                                        >
                                          Book Now
                                        </button>
                                      </div>
                                      <div
                                        style={{
                                          textAlign: "center",
                                          marginTop: "20px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "120px",
                                            height: "120px",
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            margin: "auto",
                                            backgroundColor: "white",
                                          }}
                                        >
                                          <img
                                            src={ComapanyLogo}
                                            alt="logo img"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>

                                        <h5>Smart Plan Real Estate</h5>
                                        <hr />
                                        <h6>Real Estate</h6>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "10px",
                                          }}
                                        >
                                          <i className="bi bi-envelope"></i>
                                          <span>info@abcabc.com</span>
                                          <i className="bi bi-telephone"></i>
                                          <span>+912345678</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PropertyDetails;
{
  {
    /* <div className="col-lg-24 col-md-12">
                  <div
                    className="card"
                    style={{
                      marginTop: "20px",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="card-body">
                      <GoogleMapEmbed data={property.CurrentLocation} />
                    </div>
                  </div>
                </div> */
  }
  /* <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                  }}
                                >
                                  <div className="card property-card">
                                    <div className="card-body">
                                      <i className="bi bi-geo-alt"></i>
                                      <span>{property.area}</span>
                                    </div>
                                  </div>

                                  <div className="card property-card">
                                    <div className="card-body">
                                      <i className="bi bi-arrows-fullscreen"></i>
                                      <span>1440 sqft</span>
                                    </div>
                                  </div>

                                  <div className="card property-card">
                                    <div className="card-body">
                                      <i className="bi bi-house-door"></i>
                                      <span>2BHK</span>
                                    </div>
                                  </div>
                                  {property.Facilities.split(",").includes(
                                    "Parking"
                                  ) && (
                                    <>
                                      <div className="card">
                                        <div className="card property-card">
                                          <div className="card-body">
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                              }}
                                            >
                                              <i
                                                className="bi bi-p-circle"
                                                style={{ fontSize: "40px" }}
                                              ></i>
                                              <h6>Parking</h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}

                                  {property.Facilities.split(",").includes(
                                    "Swimming Pool"
                                  ) && (
                                    <>
                                      <div className="card">
                                        <div className="card property-card">
                                          <div className="card-body">
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                              }}
                                            >
                                              <i
                                                className="bi bi-water"
                                                style={{ fontSize: "40px" }}
                                              ></i>
                                              <h6>Swimming Pool</h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}

                                  {property.Facilities.split(",").includes(
                                    "Security"
                                  ) && (
                                    <div className="card">
                                      <div className="card property-card">
                                        <div className="card-body">
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                            }}
                                          >
                                            <i
                                              className="bi bi-shield-lock"
                                              style={{ fontSize: "40px" }}
                                            ></i>
                                            <h6>Security</h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {property.Facilities.split(",").includes(
                                    "Clubhouse"
                                  ) && (
                                    <div className="card">
                                      <div className="card property-card">
                                        <div className="card-body">
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                            }}
                                          >
                                            <i
                                              className="bi bi-house-door"
                                              style={{ fontSize: "40px" }}
                                            ></i>
                                            <h6>Clubhouse</h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {property.Facilities.split(",").includes(
                                    "Playground"
                                  ) && (
                                    <div className="card">
                                      <div className="card property-card">
                                        <div className="card-body">
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                            }}
                                          >
                                            <i
                                              className="bi bi-tree"
                                              style={{ fontSize: "40px" }}
                                            ></i>
                                            <h6>Playground</h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <h4>Near By</h4>
                              <ul>
                                {property.NearBy.split(",").map(
                                  (place, index) => (
                                    <li key={index}>{place.trim()}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div> */
}

// <div className="col-lg-6 col-md-12">
// <div
//   style={{
//     width: "100%",
//   }}
// >
//   <div className="col-lg-12 col-md-12">
//     <div
//       style={{
//         width: "100%",
//         marginTop: "20px",
//         borderRadius: "20px",
//         padding: "20px",
//       }}
//     >
//       <div>
//         <div
//           style={{
//             width: "450px",
//             maxHeight: "650px",
//             backgroundColor: "#3c2415",
//             padding: "20px",
//             borderRadius: "10px",
//             flexDirection: "column",
//             color: "white",
//           }}
//         >
//           <div style={{ textAlign: "center" }}>
//             <h3>Price</h3>
//             <h4>500 AED</h4>
//           </div>
//           <hr />

//           <input
//             type="text"
//             className="form-control"
//             placeholder="Full Name"
//             style={{ marginBottom: "15px" }}
//             name="name"
//             value={formdata.name}
//             onChange={(e) =>
//               setFormData({
//                 ...formdata,
//                 name: e.target.value,
//               })
//             }
//           />

//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email"
//             name="email"
//             value={formdata.email}
//             onChange={(e) =>
//               setFormData({
//                 ...formdata,
//                 email: e.target.value,
//               })
//             }
//             style={{ marginBottom: "15px" }}
//           />
//           <input
//             type="tel"
//             className="form-control"
//             placeholder="Phone number"
//             name="number"
//             value={formdata.number}
//             onChange={(e) =>
//               setFormData({
//                 ...formdata,
//                 number: e.target.value,
//               })
//             }
//             style={{ marginBottom: "15px" }}
//           />

//           <div style={{ textAlign: "center" }}>
//             <button
//               style={{
//                 color: "black",
//                 width: "100%",
//                 backgroundColor: "#decaaf",
//                 border: "2px solid #decaaf",
//                 padding: "10px",
//               }}
//               onClick={handleSubmitListing}
//             >
//               Book Now
//             </button>
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               marginTop: "20px",
//             }}
//           >
//             <div
//               style={{
//                 width: "120px",
//                 height: "120px",
//                 borderRadius: "50%",
//                 overflow: "hidden",
//                 margin: "auto",
//                 backgroundColor: "white",
//               }}
//             >
//               <img
//                 src={Logoimg}
//                 alt="logo img"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>

//             <h5>Smart Plan Real Estate</h5>
//             <hr />
//             <h6>Real Estate</h6>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "10px",
//               }}
//             >
//               <i className="bi bi-envelope"></i>
//               <span>info@abcabc.com</span>
//               <i className="bi bi-telephone"></i>
//               <span>+912345678</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
