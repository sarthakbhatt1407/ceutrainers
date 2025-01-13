import React, { useEffect, useState } from "react";
import WebinarCard from "../components/WebinarCard";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";
import MusicLoader from "../components/Loader/MusicLoader";

const Webinars = () => {
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetcher = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ceuservices.com/api/webinar_fetch.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Specify content type
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      setWebinar(data); // Assuming data is structured this way
    } catch (error) {
      console.error("Error fetching webinars:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <WebNav />

      <PagaeHeader heading={"Webinars"} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "fit-content",
          flexWrap: "wrap",
          width: "85%",
          margin: "auto",
          gap: "1rem",
          marginTop: "2rem",
          position: "relative",
          height: loading ? "80vh" : "fit-content",
          fontFamily: "Raleway",
        }}
      >
        {" "}
        <svg
          width="789"
          preserveAspectRatio="none"
          height="465"
          viewBox="0 0 789 465"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="background"
        >
          <path
            class="back"
            d="M194.578 178.421C227.705 152.454 259.699 105.242 292.685 67V465H32.7613C-7.16033 314.865 161.45 204.388 194.578 178.421Z"
          ></path>{" "}
          <path
            class="front"
            d="M181.185 1.71661e-05H789V465H71.6845C71.6845 465 155.685 313.5 62.6848 221C-30.3152 128.5 7.68492 0 7.68492 0L181.185 1.71661e-05Z"
          ></path>{" "}
        </svg>
        {loading && <MusicLoader />}
        {webinar &&
          webinar.map((webinar) => {
            return (
              <WebinarCard
                data-aos="fade-up"
                webinar={webinar}
                key={webinar.id}
              />
            );
          })}
      </div>
      <Footer />
    </>
  );
};

export default Webinars;
