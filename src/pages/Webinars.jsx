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
      console.log(data);

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
      <PagaeHeader heading={"Webinar"} />
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
        }}
      >
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
