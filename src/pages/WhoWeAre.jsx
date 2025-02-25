import React, { useEffect } from "react";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";
import styled from "styled-components";
import who from "../assets/who.png";
import who2 from "../assets/who2.png";
import speker from "../assets/speker.webp";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
const FirstDiv = styled.div`
  background-image: url(${who});
  background-size: contain;
  background-position: center;
  height: 120vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-repeat: no-repeat;
  background-color: #f2f6f7;
`;
const Who2 = styled.div`
  background-image: url(${who2});
  background-size: cover;
  background-position: center;
  height: 80vh;

  background-repeat: no-repeat;
`;
const HeadingDiv = styled.div`
  font-family: "Raleway", sans-serif;
  width: 70%;
  margin: auto;
  height: 90svh;
  padding: 3rem 0;
  h1 {
    font-size: 55px;
    line-height: 65px;
    color: #0b0a36;
    font-family: "Raleway", sans-serif;
    font-weight: 800;
    clear: both;
    margin: 0;
    margin-bottom: 1rem;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 3fr;

    div {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 60%;
      p {
        font-size: 24px;
        line-height: 34px;
        font-weight: 600;
        color: #9cd161;
        font-family: "Raleway", sans-serif;
        display: flex;
        flex-direction: column;
        p {
          margin: 0;
        }
      }
      span {
        color: #3b3b4f;
        font-family: "Open Sans", sans-serif;
        font-size: 1rem;
        line-height: 1.875;
        font-weight: 600;
      }
      button {
        width: 60%;

        margin-top: 1rem;
        border-radius: 2rem;
        display: block;
        background-color: #408a78 !important;
        color: white !important;
        text-transform: uppercase !important;
        border: none !important;
        font-family: "Raleway", sans-serif !important;
        font-weight: 700 !important;
        font-size: 16px !important;
        padding: 19px 40px 17px !important;
        transition: 0.3s !important;

        &:hover {
          opacity: 0.9;
          background-color: #0b0a36 !important;
        }

        @media (max-width: 768px) {
          width: 100% !important;
          padding: 14px 30px !important;
        }
      }
    }
  }
`;
const H2 = styled.h2`
  font-size: 55px;
  line-height: 65px;
  font-family: "Raleway", sans-serif;
  font-weight: 800;
  clear: both;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #0b0a36;
  text-align: center;
  margin: 2rem 0;
`;

const TeacherCard = ({ name, role, image, bg }) => {
  return (
    <Card
      sx={{ textAlign: "center", borderRadius: 3, boxShadow: 3, p: 1 }}
      data-aos="fade-up"
    >
      <Box sx={{ borderRadius: "50%", p: 1, display: "inline-block" }}>
        <img
          src={speker}
          alt={name}
          style={{
            width: 300,
            height: 300,
            borderRadius: "1rem",
            border: "4px solid white",
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {role}
        </Typography>
        <Box mt={1} display="flex" justifyContent="center" gap={1}>
          <Facebook fontSize="small" color="action" />
          <Instagram fontSize="small" color="action" />
          <Twitter fontSize="small" color="action" />
        </Box>
      </CardContent>
    </Card>
  );
};

const WhoWeAre = () => {
  useEffect(() => {
    document.title = "About Us";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  const teachers = [
    {
      name: "Casey Hall",
      role: "Teacher",
      image: "casey.jpg",
      bg: "#f8e1c1",
    },
    {
      name: "Taylor Robertson",
      role: "Teacher",
      image: "taylor.jpg",
      bg: "#cdeefb",
    },
    {
      name: "Reed Bauer",
      role: "Teacher",
      image: "reed.jpg",
      bg: "#c2e6a0",
    },
    {
      name: "Reed Bauer",
      role: "Teacher",
      image: "reed.jpg",
      bg: "#c2e6a0",
    },
    {
      name: "Reed Bauer",
      role: "Teacher",
      image: "reed.jpg",
      bg: "#c2e6a0",
    },
    {
      name: "Reed Bauer",
      role: "Teacher",
      image: "reed.jpg",
      bg: "#c2e6a0",
    },
  ];
  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Who We Are?"} />
      <FirstDiv>
        <HeadingDiv>
          <h1 data-aos="fade-up">
            <span>Grow strong to take up </span>
            <span>the challenges of life.</span>
          </h1>
          <div>
            <div></div>
            <div>
              {" "}
              <p data-aos="fade-up">
                <p>Upgrade Your Skills </p>
                <p>Upgrade Your Life</p>
              </p>
              <span data-aos="fade-up">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </span>
              <button data-aos="fade-up">BOOK TODAY</button>
            </div>
          </div>
        </HeadingDiv>
        <div></div>
      </FirstDiv>

      <div
        style={{
          backgroundColor: "#f2f6f7",
          padding: "2.5rem 0",
        }}
      >
        {" "}
        <H2>World-Class Experts</H2>{" "}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            mt: 4,

            width: "80%",
            margin: "auto",
          }}
        >
          {teachers.map((teacher) => (
            <Grid item key={teacher.name} xs={12} sm={6} md={4}>
              <TeacherCard {...teacher} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Who2></Who2>
      <Footer />
    </>
  );
};

export default WhoWeAre;
