import React, { useState } from "react";
import styled from "styled-components";
import PagaeHeader from "../components/PagaeHeader";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";

// Styled Components
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
  width: 70%;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: nowrap; /* Prevent wrapping on smaller screens */
    overflow-x: auto; /* Enable horizontal scrolling */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
    -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  }

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Webkit browsers */
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
    flex: none; /* Prevent tabs from stretching on smaller screens */
    font-size: 16px;
    padding: 0.8rem 2rem;
    margin-right: 10px; /* Add spacing between tabs */
    border-radius: 10px; /* Uniform rounded corners on mobile */
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
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 10px;
    line-height: 1.6;
    color: #555;
  }
`;

const RightContent = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #f8f9fa;

  h3 {
    color: #20c997;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;

    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;

      span:last-child {
        font-weight: bold;
        color: #333;
      }
    }
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
  }

  @media (max-width: 768px) {
    padding: 15px;

    h3 {
      font-size: 1.3rem;
    }
  }
`;

const Instructor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  div {
    strong {
      display: block;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  }
`;

// Component
const WebinarDetail = () => {
  const [selectedTab, setSelectedTab] = useState("Description");

  return (
    <>
      <WebNav />
      <PagaeHeader />
      <Container>
        {/* Tabs */}
        <TabsContainer>
          {["Description", "Speaker", "Credits", "FAQs"].map((tab, index) => (
            <Tab
              key={index}
              active={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
              first={index === 0}
              last={index === 3}
            >
              {tab}
            </Tab>
          ))}
        </TabsContainer>

        <ContentContainer>
          {/* Left Content */}
          <LeftContent>
            {selectedTab === "Description" && (
              <>
                <h3>A Short Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </>
            )}
            {selectedTab === "Speaker" && <div>Speaker Content</div>}
            {selectedTab === "Credits" && <div>Credits Content</div>}
            {selectedTab === "FAQs" && <div>FAQs Content</div>}
          </LeftContent>

          {/* Right Content */}
          <RightContent>
            <h3>$100.00</h3>
            <ul>
              {[
                { label: "Duration", value: "15 weeks" },
                { label: "Lectures", value: "5" },
                { label: "Enrolled", value: "756 students" },
                { label: "Language", value: "English" },
                { label: "Deadline", value: "English" },
              ].map((item, index) => (
                <li key={index}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
            <Instructor>
              <img src="https://via.placeholder.com/50" alt="Instructor" />
              <div>
                <strong>John Doue</strong>
                <p>Teacher</p>
              </div>
            </Instructor>
            <button>BUY COURSE</button>
          </RightContent>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default WebinarDetail;
