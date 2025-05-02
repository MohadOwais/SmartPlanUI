import React, { useState, useEffect } from "react";
import Navbar from "../homepage/Navbar";
import HomeCard from "../assets/Homecard.avif";
import HomeCard2 from "../assets/Homecard2.avif";
import HomeCard3 from "../assets/Homecard3.avif";
const ImageCarousel = () => {
  const images = [
    HomeCard,
    // "https://picsum.photos/id/1003/600/400",
    HomeCard2,
    HomeCard3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, 3000);

    return () => clearInterval(timer);
  }, [total]);

  const getPositionStyle = (index) => {
    const offset = index - currentIndex;
    const visibleOffset =
      ((offset + total + Math.floor(total / 2)) % total) -
      Math.floor(total / 2);

    const zIndex = 100 - Math.abs(visibleOffset);
    const translateX = visibleOffset * 200;
    const rotateY = visibleOffset * 15;
    const scale = visibleOffset === 0 ? 1 : 0.85;

    return {
      position: "absolute",
      width: "280px",
      height: "380px",
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      transition: "all 0.5s ease",
      zIndex,
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow:
        visibleOffset === 0
          ? "0 15px 30px rgba(0,0,0,0.3)"
          : "0 5px 15px rgba(0,0,0,0.1)",
      cursor: "pointer",
      background: "#fff",
    };
  };

  const outerWrapperStyle = {
    marginTop: "100px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    gap: "20px",
    maxWidth: "1400px",
    margin: "70px auto",
  };

  const textSectionStyle = {
    flex: "1",
    minWidth: "300px",
  };

  const headingStyle = {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1600px",
    flex: "1",
    minWidth: "320px",
    overflow: "hidden",
  };

  return (
    <>
      <Navbar />
      <div style={outerWrapperStyle}>
        <div style={textSectionStyle}>
          <h1 style={headingStyle}>Find a home that suits your lifestyle.</h1>
          <p
            style={{
              fontFamily: `'Google Sans', 'Product Sans', Roboto, Arial, sans-serif`,
              fontSize: "13px",
            }}
          >
            Whether you're seeking a cozy apartment in the heart of the city, a
            spacious family home in a peaceful suburb, or a modern villa with
            scenic views, we have the perfect property for you. Explore listings
            tailored to your needs — from smart layouts and luxurious interiors
            to communities with top-notch amenities. Your ideal living space is
            just a step away.
          </p>

          <div
            style={{
              position: "relative",
              width: "300px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <a href="/property">
              <i
                className="bi bi-search"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                  fontSize: "16px",
                }}
              ></i>
            </a>
            <input
              type="text"
              placeholder="Search"
              style={{
                width: "100%",
                padding: "10px 40px 10px 12px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                fontSize: "14px",
                fontFamily: `'Google Sans', 'Product Sans', Roboto, Arial, sans-serif`,
                // borderRadius: "12px",
              }}
            />
          </div>
        </div>

        <div style={containerStyle}>
          {images.map((src, index) => (
            <div key={index} style={getPositionStyle(index)}>
              <img
                src={src}
                alt={`img-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
