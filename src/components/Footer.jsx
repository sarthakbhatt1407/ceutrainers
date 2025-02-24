import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.svg";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  LocationCity,
  Mail,
  Phone,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import footerimg from "../assets/footerimg.png";
import payment from "../assets/payment.webp";
const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  background-color: white;
  /* margin-top: 2rem; */
  height: 60vh;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  @media only screen and (min-width: 351px) and (max-width: 950px) {
    margin-top: 6rem;
  }
`;

const FirstDiv = styled.div`
  /* background-color: red; */
  width: 100%;
  height: 100%;
  margin: 0 auto;

  padding: 0rem 1rem;

  /* border-bottom: 1px solid #eee; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media only screen and (min-width: 351px) and (max-width: 950px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

const MidDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  justify-content: center;
  img {
    width: 75%;
  }
  h2 {
    font-size: 1.7rem;
    text-transform: capitalize;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    /* background-color: red; */
    width: 100%;
    gap: 1rem;
    font-size: 1.1rem;
    text-transform: capitalize;
    @media only screen and (max-width: 700px) {
    }
    span {
      cursor: pointer;
      transition: all 0.4s;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          color: #d61c01;
        }
      }
      &:hover {
        color: #d61c01;
        transform: scale(1);
      }
      @media only screen and (max-width: 700px) {
        font-size: 1rem;
        gap: 0.4rem;
      }
    }
  }
`;

const LastDivBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 100%;
  background-image: url(${footerimg});
  background-size: cover; /* Ensures the image covers the entire div */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents tiling */
`;
const LastDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  color: white;


  img {
    width: 60%;
  }

  h2 {
    font-size: 1.7rem;
    text-transform: capitalize;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    font-size: 1.1rem;
    text-transform: capitalize;
    color: white;
    div {
      display: flex;
      justify-content: start;
      flex-direction: row;
      
      align-items: start;
      input{
        background-clip: padding-box;
    background-image: none;
    border: 1px solid var(--fluentform-border-color);
    border-radius: var(--fluentform-border-radius);
    color: var(--fluentform-secondary);
    font-family: -apple-system, "system-ui", Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
    line-height: 1;
    margin-bottom: 0;
    max-width: 100%;
    padding: 11px 15px;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      }
      button{
        border: 1px solid transparent;
    border-radius: 7px;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    padding: 8px 20px;
    position: relative;
    text-align: center;
    transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
}
      }
    }
    @media only screen and (max-width: 700px) {
      /* Additional responsive styles if needed */
    }

    span {
      cursor: pointer;
      transition: all 0.4s;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      a {
        text-decoration: none;
        color: black;

        &:hover {
          color: #d61c01;
        }
      }

      &:hover {

        transform: scale(1);
      }

      @media only screen and (max-width: 700px) {
        font-size: 1rem;
        gap: 0.4rem;
      }
    }
  }
`;
// const RightDiv = styled.div``;

const SecondDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem 2rem;
  text-align: center;
`;

const Footer = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    navigate(`/${sectionId}`);
  };
  return (
    <MainDiv>
      <FirstDiv>
        <MidDiv
          style={{
            marginLeft: "3rem",
          }}
        >
          <h2>Webinars</h2>
          <div>
            <span
              onClick={() => {
                navigate("/webinars");
              }}
            >
              Human Resource
            </span>
            <span
              onClick={() => {
                navigate("/webinars");
              }}
            >
              Payroll & Taxation
            </span>

            <span
              onClick={() => {
                navigate("/webinars");
              }}
            >
              BFSI & Accounting
            </span>
            <span
              onClick={() => {
                navigate("/webinars");
              }}
            >
              Housing & Construction
            </span>
          </div>
        </MidDiv>
        <MidDiv>
          <h2>Company Info</h2>
          <div>
            <span
              onClick={() => {
                navigate("/who-we-are");
              }}
            >
              About Us
            </span>
            <span
              onClick={() => {
                navigate("/privacy-policy");
              }}
            >
              Privacy Policy
            </span>

            <span
              onClick={() => {
                navigate("/terms-and-conditions");
              }}
            >
              Terms and Condition
            </span>
            <span
              onClick={() => {
                navigate("/refund-policy");
              }}
            >
              Refund Policy
            </span>

            <span
              onClick={() => {
                navigate("/speakers");
              }}
            >
              Our Speaker
            </span>
          </div>
        </MidDiv>

        <LastDivBox className="middiv">
          <LastDiv>
            {/* <h2>Payment</h2> */}
            <img src={payment} alt="" />
          </LastDiv>
          <LastDiv>
            <h2>Get started</h2>
            <div>
              <span style={{ textTransform: "none" }}>
                Subscribe to our newsletters. Stay updated to our events. We
                never spam, We promise.
              </span>

              <div>
                <input type="text" placeholder="Your mail" />
                <button>Subscribe</button>
              </div>
            </div>
          </LastDiv>
        </LastDivBox>
      </FirstDiv>
      {/* <SecondDiv>
        <p>Copyright © 2024 XYZ. All rights reserved.</p>
      </SecondDiv> */}
    </MainDiv>
  );
};

export default Footer;
