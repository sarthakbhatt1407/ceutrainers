import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

import { useDispatch, useSelector } from "react-redux";
import Webinars from "./pages/Webinars";
import WebinarDetail from "./pages/WebinarDetail";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import TeacherProfiles from "./pages/TeacherProfiles";
import ContactForm from "./pages/ContactForm";
import FAQPage from "./pages/FAQPage";
import WhoWeAre from "./pages/WhoWeAre";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermAndConditions from "./pages/TermAndConditions";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

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

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/webinars" exact element={<Webinars />} />

        <Route path="/webinars/:slug/:id" exact element={<WebinarDetail />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/checkout" exact element={<Checkout />} />
        <Route path="/order-succes" exact element={<OrderConfirmation />} />

        <Route path="/speakers" exact element={<TeacherProfiles />} />
        <Route path="/get-in-touch" exact element={<ContactForm />} />
        <Route path="/faq" exact element={<FAQPage />} />
        <Route path="/who-we-are" exact element={<WhoWeAre />} />
        <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
        <Route path="/refund-policy" exact element={<RefundPolicy />} />
        <Route
          path="/terms-and-conditions"
          exact
          element={<TermAndConditions />}
        />

        <Route path="*" exact element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
