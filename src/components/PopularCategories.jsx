import React from "react";
import styled from "styled-components";
import chat from "../assets/chat.svg";
import chart from "../assets/chart.svg";
import show from "../assets/show.svg";
import graph from "../assets/graph.svg";
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
  padding: 4rem 2rem;
  padding-bottom: 5rem;
  text-align: center;
  margin: 0 auto;
  /* background-color: red; */
  width: 90%;
  height: fit-content;
  margin-bottom: 6rem;
`;

const Title = styled.h2`
  font-family: "Raleway", sans-serif;
  font-size: 55px;
  font-weight: 800;
  line-height: 65px;
  color: black;
`;

const GridContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
`;

const StyledCard = styled.div`
  width: 200px;
  cursor: pointer;
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

const CardTitle = styled.h3`
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  margin: 0;
  width: 70%;
  text-align: left;
  font-family: "Raleway", sans-serif;
`;

const PopularCategories = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Popular Categories</Title>
      <GridContainer>
        {categories.map((category, index) => (
          <StyledCard
            key={index}
            onClick={() => {
              navigate("/webinars");
            }}
          >
            <IconWrapper>
              <img src={category.icon} alt={`${category.title} icon`} />
            </IconWrapper>
            <CardTitle>{category.title}</CardTitle>
          </StyledCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default PopularCategories;
