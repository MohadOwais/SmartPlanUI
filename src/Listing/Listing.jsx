import React, { useEffect, useState } from "react";
import { _get } from "../../services/services_api";
import {
  GET_USER,
  API_BASE_URL,
  HOME_LISTING,
} from "../../services/end_points";
import "../publicCSS/public.css";
import Navbar from "../homepage/Navbar";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // For Excel export
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const Listing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [error, setError] = useState(null); // State to show errors
  const userid = localStorage.getItem("userId");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await _get(`${API_BASE_URL}${HOME_LISTING}/${userid}`);

      if (response.status === 200) {
        setData(response.data.data);
        // console.log("data in listing", response.data.data);
      } else {
        setError("Failed to fetch data. Please try again."); // Handle non-200 status codes
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data."); // Handle fetch errors
    } finally {
      setLoading(false); // Stop loading after fetch attempt
    }
  };

  const handleEdit = (id, user) => {
    navigate(`/Edit-Listing/${id}`, { state: { id, user } });
  };

  // Excel download function
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads List");
    XLSX.writeFile(wb, "leads_list.xlsx");
  };

  // PDF Document definition
  // const MyDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <Text style={styles.header}>Leads List</Text>
  //       {data.map((user, index) => (
  //         <View key={index} style={styles.row}>
  //           <Text>{user.company_name}</Text>
  //           <Text>{user.project_name}</Text>
  //           <Text>{user.name}</Text>
  //           <Text>{user.email}</Text>
  //           <Text>{user.number}</Text>
  //           <Text>{user.status}</Text>
  //         </View>
  //       ))}
  //     </Page>
  //   </Document>
  // );
  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Leads List</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Company Name</Text>
            <Text style={styles.tableCell}>Project Name</Text>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Email</Text>
            <Text style={styles.tableCell}>Number</Text>
            <Text style={styles.tableCell}>Status</Text>
          </View>
          {data.map((user, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{user.company_name}</Text>
              <Text style={styles.tableCell}>{user.project_name}</Text>
              <Text style={styles.tableCell}>{user.name}</Text>
              <Text style={styles.tableCell}>{user.email}</Text>
              <Text style={styles.tableCell}>{user.number}</Text>
              <Text style={styles.tableCell}>{user.status}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  const styles = StyleSheet.create({
    page: {
      padding: 20,
    },
    header: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 20,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#000",
      padding: 5,
    },
    tableCell: {
      flex: 1,
      textAlign: "center",
      padding: 5,
    },
  });

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 style={{ marginTop: "100px" }}>Leads List</h2>
        <div
          className="card"
          style={{
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <div className="card-body">
            {loading ? (
              <div className="text-center">Loading...</div> // Show loading indicator
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div> // Show error message
            ) : (
              <>
                <div
                  style={{ marginBottom: "10px" }}
                  className="d-flex justify-content-end"
                >
                  <i
                    className="bi bi-file-earmark-arrow-down-fill fs-1"
                    onClick={downloadExcel}
                  ></i>

                  <PDFDownloadLink
                    document={<MyDocument data={data} />}
                    fileName="leads_list.pdf"
                  >
                    <i className="bi bi-file-earmark-pdf fs-1"></i>
                  </PDFDownloadLink>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="table-secondary">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((user, index) => (
                          <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.company_name}</td>
                            <td>{user.project_name}</td>
                            <td>{user.user_name}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.number}</td>
                            <td>
                              <div>
                                <button
                                  className="btn btn-sm"
                                  style={{
                                    backgroundColor: "#decaaf",
                                    color: "black",
                                    borderRadius: "15px",
                                  }}
                                >
                                  {user.status}
                                </button>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: "flex" }}>
                                <i
                                  className="bi bi-pencil"
                                  style={{ marginRight: "5px" }}
                                  onClick={() =>
                                    handleEdit(user.listing_id, user)
                                  }
                                ></i>

                                <i
                                  className="bi bi-trash"
                                  style={{ marginRight: "5px" }}
                                ></i>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
