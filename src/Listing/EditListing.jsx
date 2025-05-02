import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logoimg from "../assets/logo.png";
import ComapanyLogo from "../assets/ComapanyLogo.jpg";

import { _get, _put } from "../../services/services_api";
import {
  API_BASE_URL,
  GET_ROLES,
  GET_USER,
  UPDATE_LISTING,
} from "../../services/end_points";
const EditListing = () => {
  const location = useLocation();
  const { id, user } = location.state;
  const editing = true;
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formdata, setFormData] = useState({
    company_name: editing ? user.company_name : "",
    project_name: editing ? user.project_name : "",
    name: editing ? user.name : "",
    email: editing ? user.email : "",
    number: editing ? user.number : "",
    status: editing ? user.status : "",
    UserId: editing ? user.userId : "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);
  const fetchRoles = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${GET_ROLES}${userId}`);

      if (result.status === 200 && result.data?.data) {
        setRoles(result.data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]);
    }
  };
  console.log("roles", roles);
  const fetchUser = async () => {
    try {
      const result = await _get(`${API_BASE_URL}${GET_USER}`);

      if (result.status === 200 && result.data?.data) {
        setUsers(result.data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]);
    }
  };

  const handleSubmitListing = async (e) => {
    e.preventDefault();
    try {
      const result = await _put(
        `${API_BASE_URL}${UPDATE_LISTING}${id}`,
        formdata
      ); // Send the formdata to the API
      if (result.status === 200) {
        setFormData({
          company_name: "",
          project_name: "",
          name: "",
          email: "",
          number: "",
          status: "",
        });
      }
    } catch (error) {
      console.log("Error in saving", error);
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
        }}
      >
        <div
          className="row"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <div
            className="col-lg-12 col-md-12 mt-5"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: "100%", maxWidth: "600px" }}>
              <div
                style={{
                  backgroundColor: "#3c2415",
                  padding: "20px",
                  borderRadius: "10px",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h3>Price</h3>
                  <h4>500 AED</h4>
                </div>
                <hr />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  style={{ marginBottom: "15px" }}
                  name="name"
                  value={formdata.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formdata.email}
                  onChange={handleInputChange}
                  style={{ marginBottom: "15px" }}
                />
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone number"
                  name="number"
                  value={formdata.number}
                  onChange={handleInputChange}
                  style={{ marginBottom: "15px" }}
                />
                {/* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12"> */}
                <select
                  name="UserId"
                  className="form-select"
                  value={formdata.UserId || ""}
                  onChange={handleInputChange}
                  style={{
                    marginBottom: "20px",
                    marginTop: "15px",
                  }}
                >
                  <option value="">Select Users</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {/* </div> */}
                <select
                  name="status"
                  className="form-select"
                  value={formdata.status || ""}
                  onChange={handleInputChange} // Handle status change
                  style={{ marginBottom: "20px", marginTop: "15px" }}
                >
                  <option value="">Select Status</option>
                  <option value="Successful">Successful</option>
                  <option value="Cancel">Cancel</option>
                </select>

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      color: "black",
                      width: "100%",
                      backgroundColor: "#decaaf",
                      border: "2px solid #decaaf",
                      padding: "10px",
                    }}
                    onClick={handleSubmitListing}
                  >
                    Book Now
                  </button>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
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
                      src={ComapanyLogo}
                      alt="logo img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <h5>Smart Plan Real Estate</h5>
                  <hr />
                  <h6>Real Estate</h6>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <i className="bi bi-envelope"></i>
                    <span>info@abcabc.com</span>
                    <i className="bi bi-telephone"></i>
                    <span>+912345678</span>
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

// const EditListing = () => {
//   const location = useLocation();
//   const { id, user } = location.state;
//   const editing = true;
//   const [formdata, setFormData] = useState({
//     company_name: editing ? user.company_name : "",
//     project_name: editing ? user.project_name : "",
//     name: editing ? user.name : "",
//     email: editing ? user.email : "",
//     number: editing ? user.number : "",
//     status: "",
//   });
//   const handleSubmitListing = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await _put(`${API_BASE_URL}${UPDATE_LISTING}${id}`);
//       if (result.status === 200) {
//         console.log("correct");
//       }
//     } catch (error) {
//       console.log("error in saving", error);
//     }
//   };
//   return (
//     <>
//       <div
//         className="container"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div
//           className="row"
//           style={{ width: "100%", justifyContent: "center" }}
//         >
//           <div
//             className="col-lg-12 col-md-12 mt-5"
//             style={{ width: "100%", display: "flex", justifyContent: "center" }}
//           >
//             <div
//               style={{
//                 width: "100%",
//                 maxWidth: "600px",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "#3c2415",
//                   padding: "20px",
//                   borderRadius: "10px",
//                   flexDirection: "column",
//                   color: "white",
//                 }}
//               >
//                 <div style={{ textAlign: "center" }}>
//                   <h3>Price</h3>
//                   <h4>500 AED</h4>
//                 </div>
//                 <hr />

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Full Name"
//                   style={{ marginBottom: "15px" }}
//                   name="name"
//                   value={formdata.name}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formdata,
//                       name: e.target.value,
//                     })
//                   }
//                 />

//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   name="email"
//                   value={formdata.email}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formdata,
//                       email: e.target.value,
//                     })
//                   }
//                   style={{ marginBottom: "15px" }}
//                 />
//                 <input
//                   type="tel"
//                   className="form-control"
//                   placeholder="Phone number"
//                   name="number"
//                   value={formdata.number}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formdata,
//                       number: e.target.value,
//                     })
//                   }
//                   style={{ marginBottom: "15px" }}
//                 />
//                 <select
//                   name="area"
//                   className="form-select"
//                   value={formdata.status || ""}
//                   //   onChange={handleInputChange}
//                   style={{
//                     marginBottom: "20px",
//                     marginTop: "15px",
//                   }}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Successful">Successful</option>
//                   <option value="Cancel">Cancel</option>
//                 </select>

//                 <div style={{ textAlign: "center" }}>
//                   <button
//                     style={{
//                       color: "black",
//                       width: "100%",
//                       backgroundColor: "#decaaf",
//                       border: "2px solid #decaaf",
//                       padding: "10px",
//                     }}
//                     onClick={handleSubmitListing}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//                 <div
//                   style={{
//                     textAlign: "center",
//                     marginTop: "20px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       borderRadius: "50%",
//                       overflow: "hidden",
//                       margin: "auto",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <img
//                       src={Logoimg}
//                       alt="logo img"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>

//                   <h5>Smart Plan Real Estate</h5>
//                   <hr />
//                   <h6>Real Estate</h6>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <i className="bi bi-envelope"></i>
//                     <span>info@abcabc.com</span>
//                     <i className="bi bi-telephone"></i>
//                     <span>+912345678</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <div className="row">
//         <div className="container">
//           <div className="col-lg-12 col-md-12 mt-5" style={{ width: "100%" }}>
//             <div
//               style={{
//                 width: "100%",
//                 maxWidth: "600px",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "#3c2415",
//                   padding: "20px",
//                   borderRadius: "10px",
//                   flexDirection: "column",
//                   color: "white",
//                 }}
//               >
//                 <div style={{ textAlign: "center" }}>
//                   <h3>Price</h3>
//                   <h4>500 AED</h4>
//                 </div>
//                 <hr />

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Full Name"
//                   style={{ marginBottom: "15px" }}
//                   name="name"
//                   value={formdata.name}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formdata,
//                       name: e.target.value,
//                     })
//                   }
//                 />

//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   name="email"
//                   value={formdata.email}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formdata,
//                       email: e.target.value,
//                     })
//                   }
//                   style={{ marginBottom: "15px" }}
//                 />
//                 <input
//                   type="tel"
//                   className="form-control"
//                   placeholder="Phone number"
//                   name="number"
//                   value={formdata.number}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formdata,
//                       number: e.target.value,
//                     })
//                   }
//                   style={{ marginBottom: "15px" }}
//                 />

//                 <div style={{ textAlign: "center" }}>
//                   <button
//                     style={{
//                       color: "black",
//                       width: "100%",
//                       backgroundColor: "#decaaf",
//                       border: "2px solid #decaaf",
//                       padding: "10px",
//                     }}
//                     //   onClick={handleSubmitListing}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//                 <div
//                   style={{
//                     textAlign: "center",
//                     marginTop: "20px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       borderRadius: "50%",
//                       overflow: "hidden",
//                       margin: "auto",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <img
//                       src={Logoimg}
//                       alt="logo img"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>

//                   <h5>Smart Plan Real Estate</h5>
//                   <hr />
//                   <h6>Real Estate</h6>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <i className="bi bi-envelope"></i>
//                     <span>info@abcabc.com</span>
//                     <i className="bi bi-telephone"></i>
//                     <span>+912345678</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// };
export default EditListing;
