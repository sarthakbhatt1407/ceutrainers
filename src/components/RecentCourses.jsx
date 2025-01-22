import React, { useEffect, useState } from "react";
import styled from "styled-components";
import chat from "../assets/chat.svg";
import chart from "../assets/chart.svg";
import show from "../assets/show.svg";
import graph from "../assets/graph.svg";
import WebinarCard from "./WebinarCard";
import { useNavigate } from "react-router";

const categories = [
  {
    icon: chat,
    title: "BFSI & Accounting",
  },
  {
    icon: chart,
    title: "Human Resources",
  },
  {
    icon: show,
    title: "Payroll & Taxation",
  },
  {
    icon: graph,
    title: "Housing & Construction",
  },
];

// Styled Components
const Container = styled.div`
  /* padding: 0 4rem; */
  padding-top: 2rem;
  text-align: center;
  margin: 2rem auto;
  background-color: #f2f6f7;
  width: 100%;
  height: fit-content;
  padding-bottom: 4rem;
`;

const Title = styled.h2`
  margin: 3rem;
  margin-bottom: 4rem;
  font-family: "Raleway", sans-serif;
  font-size: 55px;
  font-weight: 800;
  line-height: 65px;
  color: black;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  justify-content: space-around;
  width: 90%;

  margin: auto;
`;

const StyledCard = styled.div`
  width: 200px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #dbdbe9;
  background-color: #f2f6f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 40px 40px 40px 40px;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  transition: all 0.5s;
  border-radius: 8px 8px 8px 8px;
  &:hover {
    background-color: #fff;
    box-shadow: 0.2rem 0.2rem 1rem #d7d7d7;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }
`;

const Button = styled.button`
  width: 17%;
  margin: 5rem auto;
  border-radius: 2rem;
  display: block;
  background-color: white;
  color: black;
  text-transform: uppercase;
  border: none;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  padding: 19px 20px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    background-color: #408a78;
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 30px;
  }
`;

const RecentCourses = () => {
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    <Container>
      <Title>Recent Courses</Title>
      <GridContainer>
        {webinar &&
          webinar.map((webinar, index) => {
            if (index > 2) {
              return;
            }
            return (
              <WebinarCard
                data-aos="fade-up"
                webinar={webinar}
                key={webinar.id}
              />
            );
          })}
      </GridContainer>
      <Button
        onClick={() => {
          navigate("/webinars");
        }}
      >
        Browse All Courses
      </Button>
    </Container>
  );
};

export default RecentCourses;
