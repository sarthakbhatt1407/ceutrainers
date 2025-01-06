import React, { useState } from "react";
import IntroBox from "../components/IntroBox";

import Footer from "../components/Footer";

import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import PageBuffer from "../components/PageBuffer";

const Home = () => {
  return (
    <>
      <WebNav />

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
