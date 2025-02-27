import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { Input, message } from "antd";
import { FaUser, FaLock } from "react-icons/fa";
import { debounce } from "lodash";
import styled from "styled-components";
import Footer from "../components/Footer";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const StyledCard = styled(Card)`
  width: 70%;
  background-color: #f3f6f7;
  transition: 0.3s;
`;

const LoginContainer = styled(Box)`
  height: 70svh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  background-color: #f3f6f7;
`;

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
  padding: 19px 40px 17px;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
    background-color: #408a78;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 30px;
  }
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = debounce((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, 300);

  const validatePassword = debounce((password) => {
    return password.length >= 4;
  }, 300);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !errors.email &&
      !errors.password &&
      formData.email &&
      formData.password
    ) {
      setLoading(true);
      try {
        const response = await fetch("https://ceuservices.com/api/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (data.status == 1) {
          message.success("Login successful");
          dispatch({ type: "log in", userId: data.user_id });
          console.log("Login successful:", data);
          navigate("/profile");
          // Handle successful login (e.g., redirect to dashboard)
        } else {
          console.error("Login failed:", data);
          message.error(data.message);

          // Handle login failure (e.g., show error message)
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Account"} />
      <LoginContainer>
        <StyledCard
          style={{
            border: "1px solid #f3f6f7",
            boxShadow: "0 0 10px 0 #f3f6f7",
            width: "60%",
            backgroundColor: "#f3f6f7",
          }}
        >
          <CardContent>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".8rem",
              }}
            >
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
              >
                <Typography
                  gutterBottom
                  style={{
                    fontWeight: "800",
                    fontSize: "16px",
                    fontFamily: "Raleway",
                    lineHeight: "27px",
                    margin: "9px",
                    color: "#090A36",
                  }}
                >
                  Email Address
                </Typography>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  prefix={<FaUser />}
                  placeholder="Email Address"
                  style={{
                    height: "7.5svh",
                    borderRadius: ".5rem",
                  }}
                />
                <Typography variant="caption" color="error">
                  {errors.email}
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
              >
                <Typography
                  gutterBottom
                  style={{
                    fontWeight: "800",
                    fontSize: "16px",
                    fontFamily: "Raleway",
                    lineHeight: "27px",
                    margin: "9px",
                    color: "#0b0a36",
                  }}
                >
                  Password
                </Typography>
                <Input.Password
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  prefix={<FaLock />}
                  style={{
                    height: "7.5svh",
                    borderRadius: ".5rem",
                  }}
                  iconRender={(visible) => (visible ? "👁" : "👁️‍")}
                  placeholder="Password"
                />
                <Typography variant="caption" color="error">
                  {errors.password}
                </Typography>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <ButtonNext
                disabled={
                  loading || Boolean(errors.email) || Boolean(errors.password)
                }
                sx={{ mt: 2, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </ButtonNext>
            </form>
          </CardContent>
        </StyledCard>
      </LoginContainer>
      <Footer />
    </>
  );
};

export default LoginPage;
