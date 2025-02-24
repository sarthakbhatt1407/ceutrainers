import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import speker from "../assets/speker.webp";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";

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

const TeacherCard = ({ name, role, image, bg }) => {
  return (
    <Card sx={{ textAlign: "center", borderRadius: 3, boxShadow: 3, p: 1 }}>
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

const TeacherProfiles = () => {
  useEffect(() => {
    document.title = "Our Speakers";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Speakers"} />
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          mt: 4,
          backgroundColor: "#FFFFFF",
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
      <Footer />
    </>
  );
};

export default TeacherProfiles;
