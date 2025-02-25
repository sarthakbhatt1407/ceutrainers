import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Collapse,
} from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import styled from "styled-components";
import Footer from "../components/Footer";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: "2rem",
  paddingBottom: "2rem",
}));

const ProfileHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
  gap: "2rem",
});

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const userData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const orderData = [
    {
      orderNumber: "ORD-001",
      date: "2024-01-15",
      amount: "$299.99",
      status: "Delivered",
      details: "This is the detail of order ORD-001.",
    },
    {
      orderNumber: "ORD-002",
      date: "2024-01-10",
      amount: "$149.99",
      status: "Processing",
      details: "This is the detail of order ORD-002.",
    },
    {
      orderNumber: "ORD-003",
      date: "2024-01-05",
      amount: "$499.99",
      status: "Shipped",
      details: "This is the detail of order ORD-003.",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleExpandClick = (orderNumber) => {
    setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
  };

  const AccountInfo = () => (
    <Box>
      <ProfileHeader>
        <Avatar
          src={userData.profilePicture}
          alt={userData.fullName}
          sx={{ width: 120, height: 120 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {userData.fullName}
          </Typography>
          <Button variant="outlined" startIcon={<FiEdit2 />} sx={{ mt: 1 }}>
            Edit Profile
          </Button>
        </Box>
      </ProfileHeader>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {userData.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {userData.phone}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const OrdersInfo = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ borderBottom: "none" }}>
            <TableCell>Order Number</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((order) => (
            <React.Fragment key={order.orderNumber}>
              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => handleExpandClick(order.orderNumber)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell colSpan={5}>
                  <Collapse
                    in={expandedOrder === order.orderNumber}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      <Typography variant="body2">
                        <strong>Order Number:</strong> {order.orderNumber}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Order Date:</strong> {order.date}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Order Amount:</strong> {order.amount}
                      </Typography>
                      <Typography variant="body2">{order.details}</Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <WebNav />
      <PagaeHeader heading="Profile" />
      <StyledContainer maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="profile tabs"
          >
            <Tab
              label="Profile"
              id="profile-tab-0"
              aria-controls="profile-tabpanel-0"
            />
            <Tab
              label="Orders"
              id="profile-tab-1"
              aria-controls="profile-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <AccountInfo />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <OrdersInfo />
        </TabPanel>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default ProfilePage;
