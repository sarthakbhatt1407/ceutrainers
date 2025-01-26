import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Typography, IconButton } from "@mui/material";
import styled from "styled-components";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import {
  ArrowBack,
  ArrowForward,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

// Array of slide data
const slides = [
  {
    heading: "Self-paced courses and tutoring",
    buttonText: "BOOK TODAY",
    backgroundImage: img1,
  },
  {
    heading: "Remote learning made easy",
    buttonText: "BOOK TODAY",
    backgroundImage: img2,
  },
  {
    heading: "Open Programming Courses",
    buttonText: "BOOK TODAY",
    backgroundImage: img3,
  },
];

// Styled components for the carousel and slide content
const SlideBox = styled(Box)`
  position: relative;
  height: 80vh; /* Adjusted for viewport */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

const ContentBox = styled(Box)`
  text-align: left; /* Align text to the left */
  color: #0b0a36;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  left: 10%; /* Position content box on the left side */
  top: 50%; /* Position vertically centered */
  transform: translateY(-50%); /* Center the box vertically */
  width: 45%;
  button {
    font-family: "Raleway", Sans-serif;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 20px;
    border-style: solid;
    border-color: #02010100;
    border-radius: 100px;
    padding: 23px 34px 22px;
    color: #fff;
    background-color: #0b0a36;
    transition: all 0.3s;
    margin-top: 1rem;
    &:hover {
      background-color: #408a78;
    }
  }
`;

// SVG drawing animation
const AnimatedSVG = styled.svg`
  width: 25vw; /* Adjust width as a percentage of the viewport */
  height: 20vh; /* Adjust height as a percentage of the viewport */
  margin-right: 10px;
  path {
    stroke: #9cd161;
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: draw 2s forwards;
  }

  @keyframes draw {
    0% {
      stroke-dashoffset: 500;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

const SvgOverlay = styled.div`
  background: url("data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22516%22%20height%3D%22696%22%20viewBox%3D%220%200%20516%20696%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M325.687%20194.847C389.949%20149.438%20452.012%2066.8755%20516%200V696H11.7873C-65.6547%20433.452%20261.424%20240.256%20325.687%20194.847Z%22%20fill%3D%22%23418B78%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
    no-repeat center center;
  background-size: cover;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25rem; /* Adjusted size for SVG */
  height: 32rem; /* Adjusted size for SVG */
  display: flex;
  align-items: end;
  justify-content: end;
  flex-direction: column;
  padding-bottom: 2rem;
`;

const ControlBox = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  z-index: 10;
  padding-bottom: 5rem;
`;

const SliderComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  const navigate = useNavigate();

  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible={false}
      animation="slide"
      autoPlay={false}
      interval={5000}
      index={activeIndex}
      onChangeIndex={(index) => setActiveIndex(index)}
    >
      {slides.map((slide, index) => (
        <SlideBox key={index} backgroundImage={slide.backgroundImage}>
          <SvgOverlay>
            <ControlBox>
              <IconButton
                onClick={handlePrev}
                style={{ color: "white" }}
                aria-label="Previous Slide"
              >
                <ChevronLeft />
              </IconButton>

              <Typography
                variant="h4"
                style={{ color: "white", fontWeight: "bold" }}
              >
                {activeIndex + 1}/{slides.length}
              </Typography>

              <IconButton
                onClick={handleNext}
                style={{ color: "white" }}
                aria-label="Next Slide"
              >
                <ChevronRight />
              </IconButton>
            </ControlBox>
          </SvgOverlay>

          <ContentBox>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AnimatedSVG
                width="300"
                height="200"
                viewBox="0 0 137 113"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M136 21.5045C112.534 0.0567517 62.5366 -22.9961 50.2789 56.3743C46.966 85.5986 72.3199 114.906 78.9457 99.9616C85.5715 85.0174 6.47611 15.2778 1 112" />
              </AnimatedSVG>
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                style={{
                  fontWeight: "900",
                  fontSize: "5rem",
                  lineHeight: "4.5rem",
                }}
              >
                {slide.heading}
              </Typography>
            </div>
            <Typography
              variant="body1"
              style={{
                marginTop: "20px",
                fontSize: "24px",
                lineHeight: "45px",
                color: "#0b0a36",
                textAlign: "left",
              }}
            >
              We provide simple online booking for your convenience. Select an
              available booking slot from the calendar and you can pay directly
              online.
            </Typography>
            <button
              onClick={() => {
                navigate("/webinars");
              }}
            >
              {slide.buttonText}
            </button>
          </ContentBox>
        </SlideBox>
      ))}
    </Carousel>
  );
};

export default SliderComponent;
