import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PagaeHeader from "../components/PagaeHeader";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router";
import MusicLoader from "../components/Loader/MusicLoader";
import SRHM from "../assets/SHRM.png";
import HRCI from "../assets/HRCI.png";
import {
  AlarmOutlined,
  CalendarMonthOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { CiClock1 } from "react-icons/ci";
import { useDispatch } from "react-redux";

// Styled Components (same as before)

const Outerbox = styled.div`
  background-color: #f2f6f7;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  /* padding: 1rem 0; */
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.div`
  background-color: white;
  font-size: 19px;
  padding: 1.2rem 3.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "#408A78" : "#b5b5b5")};
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: ${(props) =>
    props.first ? "10px 0 0 10px" : props.last ? "0 10px 10px 0" : "0"};
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    flex: none;
    font-size: 16px;
    padding: 0.8rem 2rem;
    margin-right: 10px;
    border-radius: 10px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContent = styled.div`
  flex: 3;
  font-family: "Open Sans", sans-serif;
  margin-right: 1rem;
  overflow: hidden;
  h3 {
    margin-bottom: 20px;
    font-size: 1.9rem;
  }

  p {
    color: #3b3b4f;
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    line-height: 1.875;
    margin-bottom: 10px;
    text-align: justify;
  }
  ul {
    li {
      line-height: 1.6;

      font-size: 16px;
      font-family: "Open Sans", sans-serif;
    }
  }
`;

const RightContent = styled.div`
  background-color: white;
  flex: 1.3;
  padding: 30px 20px;
  padding-top: 0;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: fit-content;

  h3 {
    font-size: 1.3rem;
    color: black;
    text-align: center;
    padding: 0.7rem;
    border-bottom: 2px solid #408a78;
    border-bottom-left-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
    width: fit-content;
    margin: 1rem auto;
    margin-top: 0;
    font-family: "Open Sans", sans-serif;
    background-color: #408a78;
    color: white;
    font-family: "Raleway";
  }
  h4 {
    font-size: 1.4rem;
    color: #408a78;
    font-family: "Raleway";

    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      gap: 1rem;
      font-family: "Raleway";
      font-size: 1.2rem;
      border-bottom: 1px solid #9a9a9a;
      padding-bottom: 15px;
      label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
        font-weight: 450;
        font-family: "Raleway";
      }

      input {
        accent-color: #20c997;
        transform: scale(1.3);
        font-family: "Raleway";
      }

      span {
        font-size: 14px;
        font-family: "Raleway";
        color: #555;
      }
    }
  }

  .total-fee {
    margin-top: 20px;
    font-family: "Raleway";
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    color: #333;
  }

  button {
    background-color: #3f8978;
    color: white;
    border: none;
    padding: 10px 20px;
    width: 60%;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 550;
    font-family: "Raleway";
    display: block;
    margin: auto;
  }
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 57vh;
  font-size: 1rem;
  padding-top: 2rem;
  background-color: #408a78;
  color: white;
  gap: 0.7rem;
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    margin: 0;
    width: 70%;
    font-weight: 800;
    font-size: 2.5rem;
  }
  p {
    margin: 0;
    font-size: 1rem;
  }
  span {
    font-size: 0.7rem;
    color: #ffffffbc;
  }

  @media only screen and (min-width: 0px) and (max-width: 900px) {
    h1 {
      font-size: 1.7rem;
      width: 90%;
    }
    height: 70vh;
    div {
      width: 90%;
    }
  }
`;

const WebinarDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Description");
  const [sellingOpt, setSellingOpt] = useState([]);
  const [times, setTimes] = useState("");
  const convertESTtoTimeZones = (estTime) => {
    // Parse the EST time as a Date object (assuming EST input is in HH:mm:ss format)
    const [hours, minutes, seconds] = estTime.split(":").map(Number);
    const estDate = new Date();
    estDate.setUTCHours(hours + 5, minutes || 0, seconds || 0, 0); // Convert EST to UTC

    // Formatting options for 12-hour format with AM/PM
    const timeFormatOptions = {
      hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
      hour12: true, // 12-hour format
    };

    // Format times in all required time zones in 12-hour format
    const estTime12 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/New_York",
    });

    const cstTime12 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/Chicago",
    });

    const mstTime12 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/Denver",
    });

    const pstTime12 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/Los_Angeles",
    });

    // Return the times in 12-hour format with AM/PM
    return {
      EST: estTime12,
      CST: cstTime12,
      MST: mstTime12,
      PST: pstTime12,
    };
  };
  // Selected options state
  const [selectedOptions, setSelectedOptions] = useState({
    Live: null,
    Recording: null,
    Saver: null,
  });

  const [totalFee, setTotalFee] = useState(0);
  const handleOptionChange = (category, option) => {
    setSelectedOptions((prev) => {
      // Create a new object to avoid direct mutation of the previous state
      const updatedOptions = { ...prev };

      // Loop through all categories and deselect any selected options that aren't in the current category
      Object.keys(updatedOptions).forEach((cat) => {
        if (cat !== category) {
          updatedOptions[cat] = null; // Deselect options from other categories
        }
      });

      // If the same option is selected again, deselect it
      if (updatedOptions[category]?.label === option.label) {
        updatedOptions[category] = null;
      } else {
        // Otherwise, select the new option
        updatedOptions[category] = option;
      }

      // Recalculate the total fee based on selected options
      const newTotalFee = Object.values(updatedOptions)
        .filter(Boolean) // Filter out null values
        .reduce((acc, opt) => acc + opt.price, 0);

      setTotalFee(newTotalFee);
      return updatedOptions;
    });
  };
  // Log selected options when "Add to Cart" is clicked
  const handleAddToCart = () => {
    const selectedItems = Object.entries(selectedOptions)
      .filter(([_, option]) => option !== null)
      .map(([category, option]) => ({
        category,
        option: option.label,
        price: option.price,
        courseId: courseData.id,
        title: courseData.title,
        time: courseData.time,
        date: courseData.date,
        speaker: courseData.speaker_name,
        slug: courseData.slug,
      }));

    dispatch({ type: "add to cart", data: selectedItems[0] });
    navigate("/cart");
  };

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // Function to fetch course details
    const fetchCourseDetails = async () => {
      try {
        // Start loading
        setLoading(true);

        const response = await fetch(
          "https://ceuservices.com/api/fetch_course_detail.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }), // Sending the courseId as POST data
          }
        );

        // Check if the response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        if (data.error) {
          console.error("Error:", data.error);
        } else {
          setLoading(false); // Stop loading
          setCourseData(data[0]);
          setSellingOpt(JSON.parse(data[0]["selling_option"]));
          const resTime = convertESTtoTimeZones(data[0]["time"]);

          setTimes(resTime);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    // Fetch course details when the component is mounted or courseId changes
    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  return (
    <>
      <WebNav />
      <Outerbox>
        {loading && (
          <div
            style={{
              height: "80vh",
              position: "relative",
            }}
          >
            <MusicLoader />
          </div>
        )}

        {!loading && (
          <>
            <HeaderBox>
              <h1>{courseData.title}</h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",

                  padding: ".5rem",
                  fontSize: "1.1rem",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: ".3rem",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  <CalendarMonthOutlined />
                  {courseData.date}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: ".3rem",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  <TimerOutlined />
                  {courseData.duration} minutes
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  // width: "40%",
                  padding: ".5rem",
                  gap: "2rem",
                  fontSize: "1.2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: ".3rem",
                    alignItems: "center",
                  }}
                >
                  <AlarmOutlined />
                  {times["EST"]} EST | {"  "} {times["CST"]} CST |{" "}
                  {times["MST"]} MST |{"  "} {times["PST"]} PST
                </div>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={`https://ceuservices.com/ceuadmin/assets/images/speaker/${courseData.images}`}
                  alt=""
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                  }}
                />

                <h3
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  {courseData.speaker_name}
                </h3>
              </div> */}
            </HeaderBox>
            <Container>
              {/* Tabs */}

              <ContentContainer>
                <LeftContent>
                  <TabsContainer>
                    {["Description", "Speaker", "Credits", "FAQs"].map(
                      (tab, index) => (
                        <Tab
                          key={index}
                          active={selectedTab === tab}
                          onClick={() => setSelectedTab(tab)}
                          first={index === 0}
                          last={index === 3}
                        >
                          {tab}
                        </Tab>
                      )
                    )}
                  </TabsContainer>
                  {selectedTab === "Description" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: courseData.description,
                      }}
                    />
                  )}
                  {selectedTab === "Speaker" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`https://ceuservices.com/ceuadmin/assets/images/speaker/${courseData.images}`}
                          alt=""
                          style={{
                            width: "8rem",
                            height: "8rem",
                            borderRadius: ".5rem",
                          }}
                        />
                        <div>
                          <h3>{courseData.speaker_name}</h3>
                          <p>{courseData.designation}</p>
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: courseData.speaker_bio,
                        }}
                      />
                    </>
                  )}
                  {selectedTab === "Credits" && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",

                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <img src={SRHM} alt="" width={170} />
                        <img src={HRCI} alt="" width={170} />
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: courseData.certificate,
                        }}
                      />
                    </div>
                  )}
                  {selectedTab === "FAQs" && <div>FAQs Content</div>}
                </LeftContent>

                <RightContent>
                  <h3>Registration options</h3>
                  {sellingOpt &&
                    Object.keys(sellingOpt).map((category, index) => (
                      <div className="section" key={index}>
                        <h4>{category}</h4>
                        {/* <hr /> */}
                        <ul>
                          {Object.entries(sellingOpt[category]).map(
                            ([label, price], index) => (
                              <li key={index}>
                                <label>
                                  <input
                                    type="checkbox"
                                    name={category}
                                    checked={
                                      selectedOptions[category]?.label === label
                                    }
                                    onChange={() =>
                                      handleOptionChange(category, {
                                        label,
                                        price: parseFloat(price),
                                      })
                                    }
                                  />
                                  {label}
                                </label>
                                <span>${price}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}

                  <div className="total-fee">
                    Total Fee: $ {"  "}
                    {totalFee}
                  </div>
                  <button onClick={handleAddToCart}>Add To Cart</button>
                </RightContent>
              </ContentContainer>
            </Container>
          </>
        )}
      </Outerbox>
      <Footer />
    </>
  );
};

export default WebinarDetail;
