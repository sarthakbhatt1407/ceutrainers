import React, { useState } from "react";
import IntroBox from "../components/IntroBox";

import Footer from "../components/Footer";

import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import PageBuffer from "../components/PageBuffer";

const Home = () => {
  const [open, setOpen] = useState(false);
  const onChange = (checked) => {
    setOpen(!open);
  };
  return (
    <>
      <WebNav />

      <div>
        {/* <PageBuffer /> */}
        <PagaeHeader />
        <IntroBox />
        <Footer />
      </div>
    </>
  );
};

export default Home;
