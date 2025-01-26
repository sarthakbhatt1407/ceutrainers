import React, { useEffect } from "react";
import { Box, Container, Typography, Button, styled } from "@mui/material";
import { FaCheckCircle, FaPrint } from "react-icons/fa";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const AnimatedCheckmark = styled(Box)({
  animation: "bounce 1s ease-in-out",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-30px)",
    },
    "60%": {
      transform: "translateY(-15px)",
    },
  },
});

const OrderConfirmation = () => {
  const handlePrint = () => {
    window.print();
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <WebNav />
      <Container
        maxWidth="md"
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", py: 4 }}>
          <AnimatedCheckmark>
            <FaCheckCircle size={64} color="#2e7d32" />
          </AnimatedCheckmark>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
            Thank You for Your Order!
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Order confirmation has been sent to your email
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            We appreciate your business and hope you enjoy your purchase.
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#408A78" }}
            sx={{ mr: 2, fontWeight: "bold" }}
            onClick={() => {
              navigate("/webinars");
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default OrderConfirmation;
