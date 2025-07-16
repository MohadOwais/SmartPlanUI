import React, { useState, useEffect } from "react";
import Navbar from "../homepage/Navbar";
import { _get } from "../../services/services_api";
import {
  ALL_IMG,
  API_BASE_URL,
  IMG_API_BASE_URL,
} from "../../services/end_points";
const ImageCarousel = () => {
  const [ImagePath, setimagePath] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await _get(`${IMG_API_BASE_URL}/${ALL_IMG}`);

      const allImages = result?.data?.data || [];
      // console.log("all Images", allImages);
      // Get the first image for each unique homeId
      const firstImagesMap = {};
      allImages.forEach((img) => {
        if (!firstImagesMap[img.homeId]) {
          firstImagesMap[img.homeId] = img;
        }
      });
      const firstImages = Object.values(firstImagesMap);

      // Prepend API base URL if needed
      const imageBaseUrl = `${IMG_API_BASE_URL}`; // correct
      const imageUrls = firstImages.map(
        (img) => `${imageBaseUrl}${img.images}`
      );

      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

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
        </div>

        <div style={containerStyle}>
          {[...Array(3)].map((_, i) => {
            // Calculate the index for previous, current, next
            const idx = (currentIndex - 1 + i + images.length) % images.length;
            return (
              <div key={idx} style={getPositionStyle(idx)}>
                <img
                  src={images[idx]}
                  alt={`img-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
