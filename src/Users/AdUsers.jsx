import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../homepage/Navbar";
import Addusers from "../assets/Addusers.jpeg";
import Logoimg from "../assets/logo.png";
import { _post } from "../../services/services_api";
import { ADD_USER, API_BASE_URL } from "../../services/end_points";

const AdUsers = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.role = parseInt(data.role, 10);
    const response = await _post(`${API_BASE_URL}${ADD_USER}`, data);
    if (response.status == 200) {
      reset();
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="row" style={{ marginTop: "100px" }}>
          <div className="col-lg-8 col-md-12">
            <div
              className="card"
              style={{
                width: "100%",
                marginTop: "20px",
                borderRadius: "20px",
              }}
            >
              <div className="card-body">
                <img
                  src={Addusers}
                  className="d-block w-100"
                  style={{ maxHeight: "520px" }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div
              className="card"
              style={{
                width: "100%",
                marginTop: "20px",
                borderRadius: "20px",
              }}
            >
              <div className="card-body" style={{ backgroundColor: "#3c2415" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      className="logoClass"
                      src={Logoimg}
                      alt="logo img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                <hr />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: "100%" }}
                >
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="form-control"
                    placeholder="Name"
                    style={{ marginBottom: "20px", marginTop: "15px" }}
                  />

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

                  <select
                    {...register("role", { required: true })}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="" disabled selected>
                      Select User Type
                    </option>
                    <option value="1">Admin</option>
                    <option value="2">Agent</option>
                  </select>
                  <hr />
                  <button
                    type="submit"
                    style={{
                      color: "black",
                      width: "100%",
                      backgroundColor: "#decaaf",
                      marginTop: "50px",
                      border: "2px solid #decaaf",
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
    </>
  );
};

export default AdUsers;
