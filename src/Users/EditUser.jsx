import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../homepage/Navbar";
import Addusers from "../assets/Addusers.jpeg";
import Logoimg from "../assets/logo.png";
import { _put } from "../../services/services_api";
import { EDIT_USER, API_BASE_URL } from "../../services/end_points";
import { useLocation } from "react-router-dom";

const EditUser = () => {
  const location = useLocation();
  const { id, user } = location.state || {};
  const editing = !!user;
  const [formData, setFormData] = useState({
    name: editing ? user.name : "",
    email: editing ? user.email : "",
    password: editing ? user.passwords : "",
    role: editing ? user.roles : "",
    status: editing ? user.status : "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    const updatedData = {
      ...formData,
      role: parseInt(formData.role, 10), // Convert role to integer
    };

    try {
      const response = await _put(
        `${API_BASE_URL}${EDIT_USER}${id}`,
        updatedData
      );
      if (response.status === 200) {
        alert("User updated successfully!");
      } else {
        alert("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user!");
    }
  };

  return (
    <div className="container-fluid">
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
              <h4 className="text-center text-white">Edit User</h4>
              <hr />
              <form onSubmit={onSubmit} style={{ width: "100%" }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Name"
                  style={{ marginBottom: "20px", marginTop: "15px" }}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Email"
                  style={{ marginBottom: "20px", marginTop: "15px" }}
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Password"
                  style={{ marginBottom: "20px", marginTop: "15px" }}
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="form-select"
                  aria-label="Default select example"
                  style={{ marginBottom: "20px", marginTop: "15px" }}
                >
                  <option value="" disabled>
                    Select User Type
                  </option>
                  <option value="1">Admin</option>
                  <option value="2">Agent</option>
                </select>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                  style={{ marginBottom: "20px", marginTop: "15px" }}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>

                <hr />
                <button
                  type="submit"
                  style={{
                    color: "black",
                    width: "100%",
                    backgroundColor: "#decaaf",
                    marginTop: "20px",
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
  );
};
// const EditUser = () => {
//     const location = useLocation();
//     const { id, user } = location.state;
//     const editing = true;

// const [formData,setFormData]=useState({
//     name:editing?user.name:"",
//     email:editing?user.email:"",
//     password:editing?user.password:"",
//     role:editing?user.role:"",
//     status:"",
// })

//   const onSubmit = async (data) => {
//     data.role = parseInt(data.role, 10);
//     const response = await _post(`${API_BASE_URL}${EDIT_USER}${id}`, data);
//     if (response.status == 200) {
//       reset();
//     }
//   };
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   return (
//     <>
//       <div className="container-fluid">
//         <Navbar />
//         <div className="row" style={{ marginTop: "100px" }}>
//           <div className="col-lg-8 col-md-12">
//             <div
//               className="card"
//               style={{
//                 width: "100%",
//                 marginTop: "20px",
//                 borderRadius: "20px",
//               }}
//             >
//               <div className="card-body">
//                 <img
//                   src={Addusers}
//                   className="d-block w-100"
//                   style={{ maxHeight: "520px" }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-4 col-md-12">
//             <div
//               className="card"
//               style={{
//                 width: "100%",
//                 marginTop: "20px",
//                 borderRadius: "20px",
//               }}
//             >
//               <div className="card-body" style={{ backgroundColor: "#3c2415" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginBottom: "15px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "150px",
//                       height: "150px",
//                       borderRadius: "50%",
//                       overflow: "hidden",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <img
//                       className="logoClass"
//                       src={Logoimg}
//                       alt="logo img"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <hr />
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   style={{ width: "100%" }}
//                 >
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="form-control"
//                     placeholder="Name"
//                     style={{ marginBottom: "20px", marginTop: "15px" }}
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="form-control"
//                     placeholder="Email"
//                     style={{ marginBottom: "20px", marginTop: "15px" }}
//                   />
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="form-control"
//                     placeholder="Password"
//                     style={{ marginBottom: "15px" }}
//                   />

//                   <select
//                   name="role"
//                   value={formData.role}
//                     className="form-select"
//                     aria-label="Default select example"
//                   >
//                     <option value="" disabled selected>
//                       Select User Type
//                     </option>
//                     <option value="1">Admin</option>
//                     <option value="2">Agent</option>
//                   </select>
//                   <input
//                     type="text"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                     className="form-control"
//                     placeholder="status"
//                     style={{ marginBottom: "15px" }}
//                   />
//                   <hr />
//                   <button
//                     type="submit"
//                     style={{
//                       color: "black",
//                       width: "100%",
//                       backgroundColor: "#decaaf",
//                       marginTop: "50px",
//                       border: "2px solid #decaaf",
//                     }}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default EditUser;
