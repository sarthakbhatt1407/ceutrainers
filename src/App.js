import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

import { useDispatch, useSelector } from "react-redux";
import Webinars from "./pages/Webinars";
import WebinarDetail from "./pages/WebinarDetail";
import Error from "./pages/Error";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);

  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
    });
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
    // const aosRefresh = setInterval(() => {
    //   AOS.refresh();
    // }, 500);
    return () => {
      // clearInterval(aosRefresh);
    };
  }, []);
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/webinars" exact element={<Webinars />} />
        <Route path="/webinars/:id" exact element={<WebinarDetail />} />

        <Route path="*" exact element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
