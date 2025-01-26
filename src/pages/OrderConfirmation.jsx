import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Chip,
  styled,
} from "@mui/material";
import { FaCheckCircle, FaPrint, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: "2rem",
  marginBottom: "2rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

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
  const [orderDetails] = useState({
    orderNumber: "ORD-2024-0123",
    purchaseDate: "January 15, 2024",
    estimatedDelivery: "January 20, 2024",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    items: [
      { name: "Premium Wireless Headphones", quantity: 1, price: 199.99 },
      { name: "Smartphone Case", quantity: 2, price: 29.99 },
      { name: "USB-C Cable", quantity: 3, price: 15.99 },
    ],
    subtotal: 291.95,
    tax: 26.28,
    shipping: 12.99,
    total: 331.22,
  });

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
      <Container maxWidth="md">
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
        </Box>

        <StyledCard>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Information
                </Typography>
                <Typography>
                  <strong>Order Number:</strong> {orderDetails.orderNumber}
                </Typography>
                <Typography>
                  <strong>Purchase Date:</strong> {orderDetails.purchaseDate}
                </Typography>
                <Typography>
                  <strong>Estimated Delivery:</strong>{" "}
                  {orderDetails.estimatedDelivery}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <Typography>{orderDetails.shippingAddress.name}</Typography>
                <Typography>{orderDetails.shippingAddress.street}</Typography>
                <Typography>
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.state}{" "}
                  {orderDetails.shippingAddress.zip}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Subtotal</strong>
                    </TableCell>
                    <TableCell align="right">
                      ${orderDetails.subtotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Tax</strong>
                    </TableCell>
                    <TableCell align="right">
                      ${orderDetails.tax.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Shipping</strong>
                    </TableCell>
                    <TableCell align="right">
                      ${orderDetails.shipping.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>${orderDetails.total.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </StyledCard>

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
          <Button
            variant="outlined"
            // style={{ backgroundColor: " #0B0A36", color: "white" }}
            onClick={handlePrint}
            startIcon={<FaPrint />}
          >
            Print Order
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
