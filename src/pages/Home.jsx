import React, { useState } from "react";
import IntroBox from "../components/IntroBox";

import Footer from "../components/Footer";

import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import PageBuffer from "../components/PageBuffer";
import SliderComponent from "../components/SliderComponent";

const Home = () => {
  return (
    <>
      <WebNav />

      <div>
        <SliderComponent />
        <Footer />
      </div>
    </>
  );
};

export default Home;
