import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logoimg from "../assets/logo.png";

// import Homeimg from "../assets/home.jpg";

import "../publicCSS/public.css";
import MyCards from "./MyCards";
import Navbar from "./Navbar";
import OurProjects from "./OurProjects";
import ImagesSlider from "../ImagesSliders/ImagesSliders";

const data = {
  t1: "A house is made of bricks and beams. A home is made of hopes and dreams.",
  t2: "Home is the starting place of love, hope, and dreams",
  t3: "The magic thing about home is that it feels good to leave, and it feels even better to come back.",
  t4: "Home is where love resides, memories are created, friends always belong, and laughter never ends.",
  t5: "A home is not a place, it’s a feeling.",
  t6: "There is nothing more important than a good, safe, and secure home.",
  t7: "Home is a shelter from storms—all sorts of storms.",
  t8: "Home is the nicest word there is.",
  t9: "Where we love is home—home that our feet may leave, but not our hearts.",
  t10: "The ache for home lives in all of us, the safe place where we can go as we are and not be questioned.",
};

const Myhome = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const handleSkip = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 5; // Skip to 5 seconds
        videoRef.current.play(); // Start playing from 5 seconds
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleSkip);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleSkip);
      }
    };
  }, []);

  const randomQuote =
    Object.values(data)[Math.floor(Math.random() * Object.keys(data).length)];

  return (
    <>
      <ImagesSlider />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MyCards />
      </div>
      <div>
        <OurProjects />
      </div>
    </>
  );
};

export default Myhome;
