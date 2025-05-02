import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import ComapanyLogo from "../assets/ComapanyLogo.jpg";
import { _get, _post } from "../../services/services_api";
import { API_BASE_URL, GET_ROLES, LOGIN } from "../../services/end_points";

const Navbar = () => {
  const [responseData, setResponseData] = useState();
  const [dataroles, setDataroles] = useState();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = async () => {
    const result = await _get(`${API_BASE_URL}${GET_ROLES}${userId}`);
    setDataroles(result.data.data);
    const updatedRoles = result.data.data;

    setResponseData(updatedRoles[0].usertype);
  };

  const handleLogin = () => {
    navigate("/Login");
  };
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <a href="/">
            {/* <img
              className="logoClass"
              src={logo}
              alt="logo img"
              style={{ height: "50px" }}
            /> */}
            <img
              className="logoClass"
              src={ComapanyLogo}
              alt="logo img"
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul
              className="navbar-nav"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                listStyle: "none",
                margin: "0 auto",
                // padding: 0,
              }}
            >
              {responseData === "admin" ? (
                <>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/property">
                      Property
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="#">
                      About us
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/Contact">
                      Contact us
                    </a>
                  </li>
                  <li
                    className="nav-item dropdown"
                    style={{ margin: "0 15px" }}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="houseDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      House
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="houseDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/add-properties">
                          Add House
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/List-property">
                          House List
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/Leads-Listing">
                      Leads Listing
                    </a>
                  </li>
                  <li
                    className="nav-item dropdown"
                    style={{ margin: "0 15px" }}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      User
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/add-users">
                          Add User
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/users-list">
                          Users List
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className="nav-item dropdown"
                    style={{ margin: "0 15px" }}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="houseDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Data Management
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="houseDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/Feature-list">
                          Feature
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/add-properties">
                          Facility
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : responseData === "agent" ? (
                <>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/property">
                      Property
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="#">
                      About us
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/Contact">
                      Contact us
                    </a>
                  </li>
                  <li
                    className="nav-item dropdown"
                    style={{ margin: "0 15px" }}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="houseDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      House
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="houseDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/add-properties">
                          Add House
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/Leads-Listing">
                      Leads Listing
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/property">
                      Property
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="#">
                      About us
                    </a>
                  </li>
                  <li className="nav-item" style={{ margin: "0 15px" }}>
                    <a className="nav-link" href="/Contact">
                      Contact us
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown" style={{ fontSize: "20px" }}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>{" "}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    <i
                      className="bi bi-box-arrow-left"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Logout
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogin}>
                    <i
                      className="bi bi-box-arrow-in-right"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
