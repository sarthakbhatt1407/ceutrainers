import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";
import MusicLoader from "../components/Loader/MusicLoader";

const TeacherCard = ({ name, designation, images }) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
        height: "450px",
      }}
    >
      <Box sx={{ borderRadius: "50%", p: 1, display: "inline-block" }}>
        {console.log(
          `https://ceuservices.com/ceuadmin/assets/images/speaker/${images}`
        )}
        <img
          src={`https://ceuservices.com/ceuadmin/assets/images/speaker/${images}`}
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
          {designation}
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
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Our Speakers";
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ceuservices.com/api/speaker_detail.php"
        );
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
      setLoading(false);
    };

    fetchTeachers();
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
        {loading && <MusicLoader />}
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
