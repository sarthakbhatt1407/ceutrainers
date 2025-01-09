import React from "react";
import styled from "styled-components";
const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 35vh;
  font-size: 2rem;
  padding-top: 2rem;
  background-color: #408a78;
  color: white;
  gap: 0.7rem;
  h1 {
    margin: 0;
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
      font-size: 2.3rem;
    }
    height: 20vh;
  }
`;
const BreadCumbBox = styled.div`
  background-color: #f6f6f6;
  padding: 1rem;
  span {
    width: 90%;
    display: flex;
    margin: 0 auto;
    letter-spacing: 0.09rem;
  }
`;
const PagaeHeader = () => {
  return (
    <div>
      <HeaderBox>
        <h1>Webinar</h1>
      </HeaderBox>
      <BreadCumbBox>
        <span>Home / Webinar</span>
      </BreadCumbBox>
    </div>
  );
};

export default PagaeHeader;
