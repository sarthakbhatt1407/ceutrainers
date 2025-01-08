import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import { Icon, Menu, MenuList } from "@mui/material"; // Import for dropdown
import logo from "../../assets/icons/logo.svg";
import { Reorder } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function WebNav({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(
    path.split("/")[1] ? path.split("/")[1] : "Home"
  );
  const [anchorEl, setAnchorEl] = React.useState(null); // For dropdown anchor
  const [dropdownOpen, setDropdownOpen] = React.useState(false); // Dropdown state

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDropdownOpen(!dropdownOpen);
  };

  const handleCloseMenu = () => {
    setDropdownOpen(false);
  };

  const w = window.screen.width;

  const logoStyle = {
    width: "10rem",
    height: "3.5rem",
    cursor: "pointer",
    margin: w < 901 ? " 0  4rem 0 1rem" : " 0  4rem 0 2rem",
  };

  return (
    <AppBar
      position="relative"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
        padding: "1rem 3rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "10px",
            maxHeight: 40,
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
              justifyContent: "space-between",
              marginRight: "3rem",
            }}
          >
            <img src={logo} style={logoStyle} alt="logo of sitemark" />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem
                onClick={() => {
                  setActive("Home");
                  navigate("/");
                }}
                sx={{
                  py: "6px",
                  px: "24px",
                  "&:hover": {
                    backgroundColor: "transparent", // Ensure hover background is transparent
                    color: "#519d8a", // Hover color
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    position: "relative",
                    color: active === "Home" ? "#519d8a" : "#272727",
                    fontSize: "1.1rem",
                    fontWeight: "550",
                    marginRight: "0.1rem",
                    textTransform: "capitalize",
                    transition: "all .5s",
                    transform: active === "Home" ? "scale(1.05)" : "scale(1)",
                    letterSpacing: "0.06rem",
                    "&:hover": {
                      color: "#519d8a",
                    },
                  }}
                >
                  Home
                  <span
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 0,
                      width: "1.4rem",
                      height: "7px",
                      backgroundColor:
                        active === "Home" ? "#408A78" : "transparent",
                      borderRadius: "1rem",
                    }}
                  />
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={handleMenuClick} // Open dropdown
                sx={{
                  py: "6px",
                  px: "24px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#519d8a",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    position: "relative",

                    color: active === "webinars" ? "#519d8a" : "#272727",
                    fontSize: "1.1rem",
                    fontWeight: "550",
                    marginRight: "0.1rem",
                    textTransform: "capitalize",
                    transition: "all .5s",
                    transform:
                      active === "webinars" ? "scale(1.05)" : "scale(1)",
                    letterSpacing: "0.06rem",
                    "&:hover": {
                      color: "#519d8a",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Webinar
                  {!dropdownOpen ? <BiChevronDown /> : <BiChevronUp />}
                  <span
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 0,
                      width: "1.4rem",
                      height: "7px",
                      backgroundColor:
                        active === "webinars" ? "#408A78" : "transparent",
                      borderRadius: "1rem",
                    }}
                  />
                </Typography>
              </MenuItem>

              <Menu
                anchorEl={anchorEl} // Set anchor for dropdown
                open={dropdownOpen} // Open state for dropdown
                onClose={handleCloseMenu} // Close dropdown
                sx={{ mt: 2 }}
              >
                <MenuItem
                  onClick={() => {
                    setActive("webinars");
                    navigate("/webinars");
                    setDropdownOpen(false);
                  }}
                >
                  Webinar 1
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setActive("webinars");
                    navigate("/webinars");
                    setDropdownOpen(false);
                  }}
                >
                  Webinar 2
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setActive("webinars");
                    navigate("/webinars");
                    setDropdownOpen(false);
                  }}
                >
                  Webinar 3
                </MenuItem>
              </Menu>
              <MenuItem
                onClick={() => setActive("Contact")}
                sx={{
                  py: "6px",
                  px: "24px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#519d8a",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    position: "relative",
                    color: active === "Contact" ? "#519d8a" : "#272727",
                    fontSize: "1.1rem",
                    fontWeight: "550",
                    marginRight: "0.1rem",
                    textTransform: "capitalize",
                    transition: "all .5s",
                    transform:
                      active === "Contact" ? "scale(1.05)" : "scale(1)",
                    letterSpacing: "0.06rem",
                    "&:hover": {
                      color: "#519d8a",
                    },
                  }}
                >
                  Contact
                  <span
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 0,
                      width: "1.4rem",
                      height: "7px",
                      backgroundColor:
                        active === "Contact" ? "#408A78" : "transparent",
                      borderRadius: "1rem",
                    }}
                  />
                </Typography>
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <Button
              component="a"
              target="_blank"
              style={{
                backgroundColor: "white",
                textTransform: "uppercase",
                border: "1px solid #afafafe7",
                padding: ".6rem 1rem",
                borderRadius: "1rem",
              }}
            >
              <Link
                style={{
                  color: "black",
                  fontWeight: "bolder",
                  fontSize: ".9rem",
                }}
              >
                Register
              </Link>
            </Button>
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <Reorder style={{ color: "black" }} />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    flexGrow: 1,
                  }}
                ></Box>
                <MenuItem>Overview</MenuItem>
                <MenuItem>Services</MenuItem>
                <MenuItem>Start With Us</MenuItem>
                <MenuItem>Contact Us</MenuItem>
                <Divider />
                <MenuItem>
                  {!isLoggedIn && (
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      target="_blank"
                      sx={{ width: "100%" }}
                      style={{
                        backgroundColor: "#ff4800",
                        letterSpacing: "0.09rem",
                        color: "white",
                      }}
                    >
                      <Link
                        to={"/register"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign up
                      </Link>
                    </Button>
                  )}
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    target="_blank"
                    sx={{ width: "100%" }}
                    style={{
                      backgroundColor: "#ff4800",
                      letterSpacing: "0.09rem",
                      color: "white",
                    }}
                  >
                    {!isLoggedIn && (
                      <Link
                        to={"/login"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign in
                      </Link>
                    )}
                    {isLoggedIn && !isAdmin && (
                      <Link
                        to={"/user-panel/home"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        User Panel
                      </Link>
                    )}
                    {isLoggedIn && isAdmin && (
                      <Link
                        to={"/admin"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default WebNav;
