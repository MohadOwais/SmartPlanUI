import React from "react";

const GoogleMapEmbed = ({ data }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <iframe
        src={data}
        width="100%"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jumeirah Beach Map"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
// https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7220.5455506722565!2d55.22122248485776!3d25.19402198098508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42035d9872df%3A0x29698a78cf7295ef!2sJumeirah%20Beach!5e0!3m2!1sen!2sin!4v1735840839087!5m2!1sen!2sin"
//         width="100%"
