import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PagaeHeader from "../components/PagaeHeader";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import MusicLoader from "../components/Loader/MusicLoader";

// Styled Components (same as before)
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 1rem 0;
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

  h3 {
    margin-bottom: 20px;
    font-size: 1.9rem;
  }

  p {
    margin-bottom: 10px;
    line-height: 1.6;
    color: #555;
    font-size: 18px;
  }
  ul {
    li {
      line-height: 1.6;
      color: #555;
      font-size: 18px;
    }
  }
`;

const RightContent = styled.div`
  flex: 1.3;
  padding: 30px 20px;
  padding-top: 0;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: fit-content;
  h3 {
    font-size: 1.7rem;
    color: black;
    text-align: center;
    border-bottom: 2px solid #408a78;
    padding-bottom: 0.5rem;
    width: fit-content;
    margin: 1rem auto;
  }
  h4 {
    font-size: 1.5rem;
    color: #408a78;
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

      label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
        font-weight: 450;
      }

      input {
        accent-color: #20c997;
        transform: scale(1.3);
      }

      span {
        font-size: 14px;
        color: #555;
      }
    }
  }

  .total-fee {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    color: #333;
  }

  button {
    background: #20c997;
    color: white;
    border: none;
    padding: 10px 20px;
    width: 100%;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 500;
    font-family: "Raleway";
  }
`;

const WebinarDetail = () => {
  const id = useParams().id;
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState("Description");
  const [sellingOpt, setSellingOpt] = useState([]);

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
      }));

    console.log("Selected items:", selectedItems);
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

        if (data.error) {
          console.error("Error:", data.error);
        } else {
          setLoading(false); // Stop loading
          setCourseData(data[0]);
          setSellingOpt(JSON.parse(data[0]["selling_option"]));
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
          <PagaeHeader heading={"Webinar"} />
          <Container>
            {/* Tabs */}
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

            <ContentContainer>
              <LeftContent>
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
                    dangerouslySetInnerHTML={{
                      __html: courseData.certificate,
                    }}
                  />
                )}
                {selectedTab === "FAQs" && <div>FAQs Content</div>}
              </LeftContent>

              <RightContent>
                <h3>Registration options</h3>
                {sellingOpt &&
                  Object.keys(sellingOpt).map((category, index) => (
                    <div className="section" key={index}>
                      <h4>{category}</h4>
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

                <div className="total-fee">Total Fee: ${totalFee}</div>
                <button onClick={handleAddToCart}>Add To Cart</button>
              </RightContent>
            </ContentContainer>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
};

export default WebinarDetail;
