import React, { useState } from "react";
import PagaeHeader from "../components/PagaeHeader";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";

const WebinarDetail = () => {
  // State for the selected tab
  const [selectedTab, setSelectedTab] = useState("Description");

  return (
    <>
      <WebNav />
      <PagaeHeader />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",

            marginBottom: "20px",
            padding: "1rem 0",
          }}
        >
          {["Description", "Speaker", "Credits", "FAQs"].map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(tab)} // Set the selected tab when clicked
              style={{
                fontSize: "19px",
                padding: "1.2rem 3.5rem",
                cursor: "pointer",
                color: selectedTab === tab ? "#408A78" : "#b5b5b5",
                fontWeight: "bold",
                border: "1px solid #ddd",
                borderRadius:
                  index === 0
                    ? "10px 0 0 10px"
                    : index === 3
                    ? "0 10px 10px 0"
                    : "0", // Border radius for first and last tabs
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          {/* Left Content */}
          <div style={{ flex: 3 }}>
            {selectedTab === "Description" && (
              <>
                <h3 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
                  A Short Description
                </h3>
                <p
                  style={{
                    marginBottom: "10px",
                    lineHeight: "1.6",
                    color: "#555",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p
                  style={{
                    marginBottom: "20px",
                    lineHeight: "1.6",
                    color: "#555",
                  }}
                >
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </>
            )}
            {selectedTab === "Speaker" && <div>Curriculum Content</div>}
            {selectedTab === "Credits" && <div>Instructor Content</div>}
            {selectedTab === "FAQs" && <div>Reviews Content</div>}
          </div>

          {/* Right Content */}
          <div
            style={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              background: "#f8f9fa",
            }}
          >
            <h3
              style={{
                color: "#20c997",
                marginBottom: "20px",
                fontSize: "1.5rem",
              }}
            >
              $100.00
            </h3>
            <ul
              style={{ listStyle: "none", padding: "0", marginBottom: "20px" }}
            >
              {[
                { label: "Duration", value: "15 weeks" },
                { label: "Lectures", value: "5" },
                { label: "Enrolled", value: "756 students" },
                { label: "Language", value: "English" },
                { label: "Deadline", value: "English" },
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            {/* Instructor */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src="https://via.placeholder.com/50"
                alt="Instructor"
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div>
                <strong>John Doue</strong>
                <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                  Teacher
                </p>
              </div>
            </div>
            <button
              style={{
                background: "#20c997",
                color: "white",
                border: "none",
                padding: "10px 20px",
                width: "100%",
                borderRadius: "8px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              BUY COURSE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WebinarDetail;
