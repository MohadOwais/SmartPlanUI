import React from "react";
import Navbar from "../homepage/Navbar";
import ContactUsImg from "../assets/ContactUs.jpg";
import Logoimg from "../assets/ComapanyLogo.jpg";
const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "65px" }}>
        <div style={{ position: "relative" }}>
          <img
            src={ContactUsImg}
            alt="ContactUsImg"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0.8,
            }}
          />
          <div
            className="container-fluid mt-5"
            style={{ position: "relative" }}
          >
            <div className="container">
              <h2 className="text-center" style={{ color: "white" }}>
                Contact Us
              </h2>
              <div className="row mt-5">
                <div className="container">
                  <div className="row mt-2">
                    <div className="col-lg-7 col-md-12 mt-2">
                      <h2 className="mt-2" style={{ color: "white" }}>
                        #Welcome To Our Home
                      </h2>
                      <p style={{ color: "white" }}>
                        Creating lasting connections between people and their
                        perfect homes, redefined luxury living seamlessly
                        integrates comfort.
                      </p>
                      <h2 className="mt-2" style={{ color: "white" }}>
                        Office Address
                      </h2>
                      <p className="mt-2" style={{ color: "white" }}>
                        Intlaq (Professional) License
                      </p>
                      <h2 className="mt-2" style={{ color: "white" }}>
                        Phone Number
                      </h2>
                      <p className="mt-2" style={{ color: "white" }}>
                        00971509866796
                      </p>
                      <h2 className="mt-2" style={{ color: "white" }}>
                        Email
                      </h2>
                      <p className="mt-2" style={{ color: "white" }}>
                        smartplan.re@gmail.com
                      </p>
                      <hr style={{ color: "blue" }} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4 style={{ color: "white" }}>
                          Connect on social media for latest updates
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <div
                            style={{
                              color: "wheat",
                              display: "inline-block",
                              padding: "8px",
                              borderRadius: "50px",
                              backgroundColor: "#3c2415",
                            }}
                          >
                            <i className="bi bi-instagram fs-2"></i>
                          </div>
                          <div
                            style={{
                              color: "wheat",
                              display: "inline-block",
                              padding: "8px",
                              borderRadius: "50px",
                              backgroundColor: "#3c2415",
                            }}
                          >
                            <i className="bi bi-facebook fs-2"></i>
                          </div>
                          <div
                            style={{
                              color: "wheat",
                              display: "inline-block",
                              padding: "8px",
                              borderRadius: "50px",
                              backgroundColor: "#3c2415",
                            }}
                          >
                            <i className="bi bi-whatsapp fs-2"></i>
                          </div>
                          {/* 
                          <i className="bi bi-facebook fs-2"></i>
                          <i className="bi bi-whatsapp fs-2"></i> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-12 ">
                      <div
                        className="card"
                        style={{
                          width: "100%",
                          maxWidth: "600px",
                          marginTop: "20px",
                          borderRadius: "20px",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "#3c2415",
                        }}
                      >
                        <div className="card-body">
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
                              src={Logoimg}
                              alt="logo img"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <form
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "100%",
                              marginTop: "20px",
                            }}
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              style={{
                                marginBottom: "15px",
                                width: "90%",
                              }}
                              name="name"
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              style={{
                                marginBottom: "15px",
                                width: "90%",
                              }}
                              name="email"
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              style={{
                                marginBottom: "15px",
                                width: "90%",
                              }}
                              name="phone"
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Location"
                              style={{
                                marginBottom: "15px",
                                width: "90%",
                              }}
                              name="location"
                            />
                            <textarea
                              placeholder="Message"
                              style={{
                                marginBottom: "15px",
                                width: "90%",
                                height: "100px",
                              }}
                            ></textarea>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                width: "90%",
                                border: "none",
                                backgroundColor: "#b9b5b5",
                                color: "black",
                                borderRadius: "20px",
                              }}
                            >
                              Submit
                            </button>
                          </form>
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
  );
};
export default ContactUs;

{
  /* <div className="col-lg-6 col-md-12 mt-5">
<h2>Explore Our Property</h2>
<p>
  Explore the most exclusive real estate listings in Abu Dhabi,
  Dubai, and Ras al Khaimah.
</p>
<div>
  <p>
    At Smart Plan Real Estate, we pride ourselves on delivering
    excellence in every project we undertake. With a proven
    track record of successfully completing numerous projects,
    we are well-equipped to handle ventures of any scale, from
    residential developments to large commercial projects. Our
    meticulous planning, seamless execution, and client-first
    approach set us apart in the real estate industry. Every
    project executed by Smart Plan Real Estate reflects our
    commitment to quality, innovation, and professionalism.
    Whether you're looking to invest, develop, or collaborate,
    Smart Plan Real Estate is ready to partner with you to turn
    your vision into reality. Let's build a future together!
  </p>
</div>
</div>
<div className="col-lg-6 col-md-12">
<div
  className="card"
  style={{
    width: "100%",
    maxWidth: "600px",
    marginTop: "20px",
    borderRadius: "20px",
  }}
>
  <div className="card-body">
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            style={{ height: "350px", maxHeight: "400px" }}
            src={apartment1}
            className="d-block w-100"
            alt="Slide 1"
          />
        </div>
        <div className="carousel-item">
          <img
            style={{ height: "350px", maxHeight: "400px" }}
            src={apartment2}
            className="d-block w-100"
            alt="Slide 2"
          />
        </div>
        <div className="carousel-item">
          <img
            style={{ height: "350px", maxHeight: "400px" }}
            src={apartment3}
            className="d-block w-100"
            alt="Slide 3"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</div> */
}
