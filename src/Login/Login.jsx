import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import ComapanyLogo from "../assets/ComapanyLogo.jpg";

import { _post } from "../../services/services_api";
import { API_BASE_URL, LOGIN } from "../../services/end_points";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await _post(`${API_BASE_URL}${LOGIN}`, data);
  //     console.log("response", response);
  //     if (response.status === 200) {
  //       navigate("/");
  //       localStorage.setItem("userId");
  //       localStorage.setItem("token");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      const response = await _post(`${API_BASE_URL}${LOGIN}`, data);

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        if (response.data.status === 1) {
          navigate("/");
        } else {
          navigate("/Login");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional for better visuals
          }}
        >
          <div
            className="card-body"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <img
                  src={ComapanyLogo}
                  alt="logo img"
                  style={{
                    width: "150px",
                    display: "block",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <input
                type="email"
                {...register("email", { required: true })}
                className="form-control"
                placeholder="Email"
                style={{ marginBottom: "20px", marginTop: "15px" }}
              />
              <input
                type="password"
                {...register("password", { required: true })}
                className="form-control"
                placeholder="Password"
                style={{ marginBottom: "15px" }}
              />
              <button
                type="submit"
                style={{
                  color: "white",
                  width: "100%",
                  backgroundColor: "#3c2415",
                  border: "2px solid #decaaf",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
