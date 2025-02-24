import React, { useEffect, useState } from "react";
import IntroBox from "../components/IntroBox";

import Footer from "../components/Footer";

import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import PageBuffer from "../components/PageBuffer";
import SliderComponent from "../components/SliderComponent";
import PopularCategories from "../components/PopularCategories";
import RecentCourses from "../components/RecentCourses";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <WebNav />

      <div>
        <SliderComponent />
        <PopularCategories />
        <RecentCourses />
        <Footer />
      </div>
    </>
  );
};

export default Home;
