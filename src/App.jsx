import { useState } from "react";
import viteLogo from "/vite.svg";
import Myhome from "./homepage/Myhome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Property from "./MyProperties/Property";
import PropertyDetails from "./MyProperties/PropertyDetails";
import AdUsers from "./Users/AdUsers";
import Login from "./Login/Login";
import UserList from "./Users/UsersList";
import AddProperty from "./AddProperties/AddProperty";
import Listing from "./Listing/Listing";
import EditListing from "./Listing/EditListing";
import EditUser from "./Users/EditUser";
import ListProperty from "./AddProperties/ListProperty";
import Editproperty from "./AddProperties/Editproperty";
import ContactUs from "./ContactUs/ContactUs";
import FeatureList from "./datamanagement/Features/FeatureList";
import FacilitiesList from "./datamanagement/Facilities/FacilitiesList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Myhome />} />
          <Route path="/add-users" element={<AdUsers />} />
          <Route path="/Edit-user/:id" element={<EditUser />} />
          <Route path="/users-list" element={<UserList />} />
          <Route path="/add-properties" element={<AddProperty />} />
          <Route path="/property" element={<Property />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Leads-Listing" element={<Listing />} />
          <Route path="/List-property" element={<ListProperty />} />
          <Route path="/Edit-property/:id" element={<Editproperty />} />
          <Route path="/Edit-Listing/:id" element={<EditListing />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/Feature-list" element={<FeatureList />} />
          <Route path="/Facilities-list" element={<FacilitiesList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
