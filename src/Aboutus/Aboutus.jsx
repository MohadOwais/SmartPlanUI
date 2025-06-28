import React from "react";
import Logoimg from "../assets/ComapanyLogo.jpg";
import client from "../assets/client.jpg";
import "./Aboutus.css";
import Navbar from "../homepage/Navbar";

const Aboutus = () => {
  return (
    <>
      <Navbar />
      <div className="aboutus-bg">
        <div className="aboutus-main">
          <div className="aboutus-left">
            <h1 className="aboutus-title">ABOUT US</h1>
            <p className="aboutus-description">
              <strong>Smart Plan</strong> is a premier real estate company,
              committed to delivering exceptional property solutions for both
              residential and commercial needs. Our experienced team guides
              clients through every step of buying, selling, or renting,
              ensuring a smooth and transparent process.
            </p>
            <p className="aboutus-description">
              We pride ourselves on our deep market knowledge, innovative
              approach, and dedication to customer satisfaction. Whether you are
              searching for your dream home or a strategic investment, Smart
              Plan is your trusted partner in real estate.
            </p>
            <p className="aboutus-owner">
              <strong>Owner:</strong> Sayeed Salam Al Ketbi
            </p>
            <a href="/contact" className="aboutus-contact-btn">
              Contact Us
            </a>
          </div>
          <div className="aboutus-right">
            <img
              src={Logoimg}
              alt="Smart Plan Logo"
              className="aboutus-logo-top"
            />
            <img
              src={client}
              alt="Our Clients"
              className="aboutus-client-img"
            />
          </div>
        </div>
        <div className="aboutus-footer">
          Designed by <span>Smart Plan</span>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
