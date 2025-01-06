import React from "react";
import WebinarCard from "./WebinarCard";

const IntroBox = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: "fit-content",
        flexWrap: "wrap",
        width: "90%",
        margin: "auto",
        gap: "2rem",
        marginTop: "2rem",
      }}
    >
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
      <WebinarCard data-aos="fade-up" />
    </div>
  );
};

export default IntroBox;
