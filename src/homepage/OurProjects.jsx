import React, { useEffect, useState } from "react";
import MoreProperties from "../assets/MoreProperties.jpg";
import "../publicCSS/public.css";
import Logoimg from "../assets/logo.png";
import building2 from "../assets/building2.jpg";
import {
  ALL_IMG,
  API_BASE_URL,
  GET_HOME,
  PROPERTY_IMG,
} from "../../services/end_points";
import { _get } from "../../services/services_api";
import { useNavigate } from "react-router-dom";
import ComapanyLogo from "../assets/ComapanyLogo.jpg";
import realestateLogo from "../assets/realestateLogo.webp";
import realestateLogo2 from "../assets/realestateLogo2.png";
import realestateLogo3 from "../assets/realestateLogo3.png";
import realestateLogo4 from "../assets/realestateLogo4.svg";
import realestateLogo5 from "../assets/realestateLogo5.svg";
import realestateLogo6 from "../assets/realestateLogo6.svg";

const OurProjects = () => {
  const navigate = useNavigate();
  const [properties, setProperty] = useState([]);

  const [ImagePath, setimagePath] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  useEffect(() => {
    getPropertyData();
  }, []);

  const getPropertyData = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${GET_HOME}`);
      // console.log("Property result", result);

      if (result.status == 200) {
        setProperty(result.data.data);
      }
    } catch (error) {}
  };
  console.log("Properties", properties);

  const homeId = properties.map((p) => p.id);
  console.log("Home IDs", homeId);
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     if (!homeId) return;
  //     try {
  //       const result = await _get(`${API_BASE_URL}${ALL_IMG}`);
  //       console.log("Image result", result);
  //       const images = result?.data?.data || [];
  //       setimagePath(images);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };

  //   fetchImages();
  // }, [homeId]);
  useEffect(() => {
    const fetchImages = async () => {
      if (!properties.length) return;
      try {
        const result = await _get(`${API_BASE_URL}${ALL_IMG}`);
        // console.log("Image result", result);
        const images = result?.data?.data || [];
        setimagePath(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [properties]);
  const chunkSize = 3;
  const groupedProperties = [];
  for (let i = 0; i < properties.length; i += chunkSize) {
    // console.log("Properties", properties.slice(i, i + chunkSize));
    groupedProperties.push(properties.slice(i, i + chunkSize));
  }
  const handleButtonClick = (property) => {
    navigate("/property-details", { state: { property } });
  };
  const duration = 6; // seconds

  const galleryStyle = {
    display: "grid",
    overflow: "hidden",
    WebkitMaskImage: "linear-gradient(90deg, #0000, #000 10%, #000 90%, #0000)",
    maskImage: "linear-gradient(90deg, #0000, #000 10%, #000 90%, #0000)",
  };

  const imageStyle = (index) => ({
    gridArea: "1 / 1",
    height: "200px",
    aspectRatio: "1.5",
    objectFit: "cover",
    animation: `scroll ${duration}s linear infinite`,
    animationDelay: `${(index * duration) / -4}s`,
  });
  const images = [
    realestateLogo,
    realestateLogo2,
    realestateLogo3,
    realestateLogo4,
    realestateLogo5,
    realestateLogo6,
  ];
  // console.log("groupedProperties", groupedProperties);
  // console.log("ImagePath", ImagePath);
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-24 col-md-12 mt-5">
              <div className="container-fluid">
                <h1>Our Projects</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <p>
                      Explore latest and featured properties for sale, rent &
                      mortgage.
                    </p>
                  </div>
                  <div>
                    <a href="/property">
                      <button style={{ color: "black" }}>
                        View More Properties
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div
            id="propertyCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {groupedProperties.map((group, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="row justify-content-center">
                    {group.map((property) => {
                      let imageArray = [];
                      try {
                        imageArray = ImagePath.filter(
                          (img) => img.homeId === property.id
                        ).map((img) => img.images);
                      } catch (error) {
                        console.error("Error filtering ImagePath:", error);
                      }

                      const baseUrl = "http://localhost:8080";
                      // const baseUrl = "https://smartplan-be.vercel.app";

                      const imageUrl =
                        imageArray.length > 0
                          ? `${baseUrl}${imageArray[0]}`
                          : `${building2}`;

                      return (
                        <div
                          className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
                          key={property.id}
                        >
                          <div
                            className="card"
                            style={{
                              width: "100%",
                              maxWidth: "400px",
                              height: "100%",
                              borderRadius: "20px",
                              border: "D3D3D3",
                              background: "FFFFFF ",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <div className="card-body d-flex flex-column align-items-center">
                              <img
                                src={imageUrl}
                                className="img-fluid"
                                alt={property.ApartmentName}
                                style={{
                                  maxHeight: "250px",
                                  width: "100%",
                                  objectFit: "cover",
                                  borderRadius: "15px",
                                }}
                              />
                              <h3
                                className="text-center mt-3"
                                style={{ color: "#3c2415" }}
                              >
                                {property.ApartmentName}
                              </h3>
                              <div
                                className="d-flex flex-wrap justify-content-center gap-3 my-3"
                                style={{ color: "#3c2415" }}
                              >
                                <div className="d-flex align-items-center gap-1">
                                  <i
                                    className="bi bi-geo-alt"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                  <span style={{ fontSize: "16px" }}>
                                    {property.area}
                                  </span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                  <i
                                    className="bi bi-arrows-fullscreen"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                  <span style={{ fontSize: "16px" }}>
                                    1200sq
                                  </span>
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                  <i
                                    className="bi bi-pencil-square"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                  <span style={{ fontSize: "16px" }}>
                                    {property.selectPlan === 0
                                      ? "Ready"
                                      : "OffPlan"}
                                  </span>
                                </div>
                              </div>
                              <button
                                style={{
                                  color: "white",
                                  width: "100%",
                                  // backgroundColor: "#3c2415",
                                  backgroundColor: "#4A4A4A ",
                                  // border: "2px solid #decaaf",
                                  border: "2px solid #4A4A4A",
                                  borderRadius: "8px",
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
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#propertyCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#propertyCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "400px",
            maxHeight: "600px",
            marginTop: "100px",
            borderRadius: "20px",
          }}
        >
          {/* <div className="container">
            <div className="row">
              <div className="col-lg-24 mt-5" style={{ textAlign: "center" }}>
                <h2>
                  Ready to Realizes Your Dream House Become Reality with us?
                </h2>
                <div class="gallery">
                  <img
                    src="https://picsum.photos/id/104/400/400"
                    alt="a dream catcher"
                  />
                  <img
                    src="https://picsum.photos/id/1082/400/400"
                    alt="a piano"
                  />
                  <img
                    src="https://picsum.photos/id/158/400/400"
                    alt="a live concert"
                  />
                  <img src="https://picsum.photos/id/234/400/400" alt="Paris" />
                </div>
              </div>
            </div>
          </div> */}
          <div className="container mt-5 text-center">
            <h2>Our Clients</h2>

            <style>
              {`
          @keyframes scrollRight {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .scrolling-wrapper {
            overflow: hidden;
            width: 100%;
            height: 220px;
            position: relative;
          }

          .scrolling-content {
            display: flex;
            gap: 30px;
            animation: scrollRight 15s linear infinite;
          }

          .scrolling-content img {
            height: 200px;
            width: auto;
            object-fit: cover;
            border-radius: 10px;
          }
        `}
            </style>

            <div
              className="scrolling-wrapper"
              // style={{ backgroundColor: "#4A4A4A" }}
            >
              <div className="scrolling-content">
                {images.concat(images).map((src, i) => (
                  <img src={src} alt={`Gallery ${i}`} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#4A4A4A",
            height: "100%",
          }}
        >
          <div className="container">
            <div className="row">
              <div
                className="container mt-5"
                style={{
                  padding: "40px 0",
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
                  <li style={{ margin: "0 15px", cursor: "pointer" }}>Home</li>

                  <li style={{ margin: "0 15px", cursor: "pointer" }}>
                    Property
                  </li>
                  <li style={{ margin: "0 15px", cursor: "pointer" }}>
                    About Us
                  </li>
                  <li style={{ margin: "0 15px", cursor: "pointer" }}>
                    Contact Us
                  </li>
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
                  <p>📞 +91-9876543210</p>
                  <p>✉️ info@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OurProjects;
