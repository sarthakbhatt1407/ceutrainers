import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import MusicLoader from "../components/Loader/MusicLoader";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Divider } from "antd";
import { useNavigate } from "react-router";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: "2rem",
  paddingBottom: "2rem",
}));

const ButtonNext = styled.button`
  width: 15%;
  background-color: #0b0a36;
  border-radius: 2rem;
  display: block;
  color: white;
  text-transform: uppercase;
  border: none;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 10px 11px;
  transition: 0.3s;
  margin-top: 2rem;
  &:hover {
    opacity: 0.9;
    background-color: #408a78;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 30px;
  }
`;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ceuservices.com/api/customer_detail.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUserData(data.user_info);
          setOrderData(data.orders);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleExpandClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const AccountInfo = () => (
    <Box>
      <ProfileHeader>
        {/* <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt={userData.name}
          sx={{ width: 120, height: 120 }}
        /> */}
        <AccountCircleOutlined
          style={{ width: 100, height: 100, color: "#3F8978" }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {userData.name}
          </Typography>
        </Box>
      </ProfileHeader>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {userData.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {userData.number}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> {userData.address}, {userData.address2},{" "}
            {userData.city}, {userData.state}, {userData.country},{" "}
            {userData.pin_code}
          </Typography>
          <ButtonNext
            sx={{ mt: 2, mb: 2 }}
            onClick={() => {
              dispatch({ type: "logout" });
              navigate("/login");
            }}
          >
            Logout
          </ButtonNext>
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
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((order) => (
            <React.Fragment key={order.order_id}>
              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.trans_date}</TableCell>
                <TableCell>${order.amount}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => handleExpandClick(order.order_id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell colSpan={5}>
                  <Collapse
                    in={expandedOrder === order.order_id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      <Typography variant="body2">
                        <strong>Webinar:</strong> {order.title}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Order Number:</strong> {order.order_id}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Order Date:</strong> {order.trans_date}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Order Amount:</strong> ${order.amount}
                      </Typography>
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

  return (
    <>
      <WebNav />
      <PagaeHeader heading="Profile" />
      <StyledContainer maxWidth="lg" style={{ position: "relative" }}>
        {loading && <MusicLoader />}
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
          {userData && <AccountInfo />}
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
