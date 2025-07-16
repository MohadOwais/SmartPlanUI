import React, { useRef, useEffect, useState } from "react";
import bedRoom1 from "../assets/bedRoom1.jpg";
import bedRoom2 from "../assets/bedRoom2.jpg";
import bedRoom3 from "../assets/bedRoom3.jpg";
import slidersCard1 from "../assets/slidersCard1.jpg";
import slidersCard2 from "../assets/slidersCard2.jpg";
import openLand from "../assets/openLand.jpg";
import office from "../assets/office.jpg";
import apartment1 from "../assets/apartment1.jpg";
import apartment2 from "../assets/apartment2.jpg";
import apartment3 from "../assets/apartment3.jpg";
import { motion } from "framer-motion";

const MyCards = () => {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row mt-5">
          <div className="col-lg-6 col-md-12 mt-5">
            <h2>Explore Our Property</h2>
            <p>
              Explore the most exclusive real estate listings in Abu Dhabi,
              Dubai, and Ras al Khaimah.
            </p>
            <div>
              <p>
                At Smart Plan Real Estate, we pride ourselves on delivering
                excellence in every project we undertake. With a proven track
                record of successfully completing numerous projects, we are
                well-equipped to handle ventures of any scale, from residential
                developments to large commercial projects. Our meticulous
                planning, seamless execution, and client-first approach set us
                apart in the real estate industry. Every project executed by
                Smart Plan Real Estate reflects our commitment to quality,
                innovation, and professionalism. Whether you're looking to
                invest, develop, or collaborate, Smart Plan Real Estate is ready
                to partner with you to turn your vision into reality. Let's
                build a future together!
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
          </div>
        </div>

        <div className="row " style={{ marginTop: "100px" }}>
          <div className="col-12">
            <h1 ref={headingRef} className="mb-5">
              Smart Plan Real Estate Tailored for You.
            </h1>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 d-flex justify-content-center">
            {isVisible && (
              <motion.img
                src={slidersCard1}
                alt="Villa View"
                className="img-fluid rounded shadow"
                style={{
                  width: "400px",
                  height: "200px",
                  borderRadius: "20px",
                }}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}
          </div>

          <div className="col-lg-6">
            <h2 className="mb-3">Villas</h2>
            <p
              className="lead"
              style={{
                fontFamily: `'Google Sans', 'Product Sans', Roboto, Arial, sans-serif`,
                fontSize: "18px",
              }}
            >
              Discover premium villas designed for luxurious living. Whether
              you're looking for serene landscapes, modern architecture, or a
              smart investment opportunity, our tailored villa plans meet every
              expectation.
            </p>
          </div>
        </div>

        {/* Apartments Section */}
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="mb-3">Apartments</h2>
            <p
              className="lead"
              style={{
                fontFamily: `'Google Sans', 'Product Sans', Roboto, Arial, sans-serif`,
                fontSize: "18px",
              }}
            >
              Apartments are self-contained living spaces within a larger
              building, offering various sizes and amenities. Ideal for urban
              living, they provide comfort and convenience with options for rent
              or sale.
            </p>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            {isVisible && (
              <motion.img
                src={slidersCard2}
                alt="Apartment View"
                className="img-fluid rounded shadow"
                style={{
                  width: "400px",
                  height: "200px",
                  borderRadius: "20px",
                }}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 d-flex justify-content-center">
            {isVisible && (
              <motion.img
                src={openLand}
                alt="Villa View"
                className="img-fluid rounded shadow"
                style={{
                  width: "400px",
                  height: "200px",
                  borderRadius: "20px",
                }}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}
          </div>

          <div className="col-lg-6">
            <h2 className="mb-5 mt-5">Open Land</h2>
            <p
              className="lead"
              style={{
                fontFamily: `'Google Sans', 'Product Sans', Roboto, Arial, sans-serif`,
                fontSize: "18px",
              }}
            >
              Experience the pinnacle of luxurious living with Smartplan’s Open
              Land collection. Our premium villas are thoughtfully designed to
              harmonize with serene landscapes, offering a perfect blend of
              modern architecture and natural beauty. Whether you're seeking a
              peaceful retreat, a stylish home, or a promising investment,
              Smartplan delivers tailored villa plans that exceed expectations.
              Discover the smart way to invest in your future—discover Open
              Land.
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="mb-3">Office</h2>
            <p
              className="lead"
              style={{
                fontFamily: `'Google Sans', 'Product Sans', Roboto, Arial, sans-serif`,
                fontSize: "18px",
              }}
            >
              Redefine the way you work with Smartplan’s premium office spaces.
              Designed for productivity and prestige, our office solutions
              combine modern infrastructure, strategic locations, and sleek
              design to create an inspiring work environment. Whether you're
              launching a startup or expanding your enterprise, Smartplan offers
              flexible, future-ready spaces tailored to your business needs.
              Build smarter, work better—choose Smartplan Offices.
            </p>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            {isVisible && (
              <motion.img
                src={office}
                alt="Apartment View"
                className="img-fluid rounded shadow"
                style={{
                  width: "400px",
                  height: "200px",
                  borderRadius: "20px",
                }}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCards;

{
  /* <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 mt-5">
              <div className="container-fluid">
                <h1>Smart Plan Real Estate Tailored for You</h1>
                <p>
                  We believe that your property journey should be as unique as
                  you are. Whether you're looking for an off-plan investment, a
                  luxury villa, or a prime resale property, we provide bespoke
                  real estate solutions that align with your goals.
                </p>
                <ul>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      Off-plan investment
                    </span>
                    <ul>
                      <li>Explore new developments</li>
                      <li>Benefit from early-stage pricing</li>
                    </ul>
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Luxury villa</span>

                    <ul>
                      <li>Exclusive properties with premium amenities</li>
                      <li>Prime locations in desirable neighborhoods</li>
                    </ul>
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      Prime resale property
                    </span>
                    <ul>
                      <li>Access to prestigious properties</li>
                      <li>Competitive market prices</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div
                className="card"
                style={{
                  width: "100%",
                  // maxWidth: "600px",
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
                          src={bedRoom1}
                          className="d-block w-100"
                          alt="Slide 1"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={bedRoom2}
                          className="d-block w-100"
                          alt="Slide 2"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={bedRoom3}
                          className="d-block w-100"
                          alt="Slide 3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
