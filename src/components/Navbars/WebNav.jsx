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
import { Menu } from "@mui/material"; // Import for dropdown
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
  const [anchorEl2, setAnchorEl2] = React.useState(null); // For dropdown anchor
  const [dropdownOpen, setDropdownOpen] = React.useState(false); // Dropdown state
  const [dropdownOpen2, setDropdownOpen2] = React.useState(false); // Dropdown state

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDropdownOpen(!dropdownOpen);
    console.log(dropdownOpen2);
  };

  const handleCloseMenu = () => {
    setDropdownOpen(false);
  };

  const w = window.screen.width;

  const logoStyle = {
    width: w < 901 ? "4rem" : "10rem",
    height: "3.5rem",
    cursor: "pointer",
    margin: w < 901 ? " 0  11rem 0 0rem" : " 0  4rem 0 2rem",
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
                    fontFamily: "Raleway",
                    color: active === "categories" ? "#519d8a" : "#272727",
                    fontSize: "1.1rem",
                    fontWeight: "550",
                    marginRight: "0.1rem",
                    textTransform: "capitalize",
                    transition: "all .5s",
                    transform:
                      active === "categories" ? "scale(1.05)" : "scale(1)",
                    letterSpacing: "0.06rem",
                    "&:hover": {
                      color: "#519d8a",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Categories
                  {!dropdownOpen ? <BiChevronDown /> : <BiChevronUp />}
                  <span
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 0,
                      width: "1.4rem",
                      height: "7px",
                      backgroundColor:
                        active === "categories" ? "#408A78" : "transparent",
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
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "500",
                    }}
                  >
                    Category 1
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setActive("webinars");
                    navigate("/webinars");
                    setDropdownOpen(false);
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "500",
                    }}
                  >
                    Category 2
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setActive("webinars");
                    navigate("/webinars");
                    setDropdownOpen(false);
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "500",
                    }}
                  >
                    Category 3
                  </Typography>
                </MenuItem>
              </Menu>
              <MenuItem
                onClick={() => {
                  setActive("webinars");
                  navigate("/webinars");
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
                    fontFamily: "Raleway",
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
                  }}
                >
                  Webinars
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
                    fontFamily: "Raleway",
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
                  Who we are?
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
              <MenuItem
                onClick={(event) => {
                  setAnchorEl2(event.currentTarget);
                  setDropdownOpen2(!dropdownOpen2);
                }} // Open dropdown
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
                    fontFamily: "Raleway",
                    color: active === "help" ? "#519d8a" : "#272727",
                    fontSize: "1.1rem",
                    fontWeight: "550",
                    marginRight: "0.1rem",
                    textTransform: "capitalize",
                    transition: "all .5s",
                    transform: active === "help" ? "scale(1.05)" : "scale(1)",
                    letterSpacing: "0.06rem",
                    "&:hover": {
                      color: "#519d8a",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Help
                  {!dropdownOpen2 ? <BiChevronDown /> : <BiChevronUp />}
                  <span
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 0,
                      width: "1.4rem",
                      height: "7px",
                      backgroundColor:
                        active === "help" ? "#408A78" : "transparent",
                      borderRadius: "1rem",
                    }}
                  />
                </Typography>
              </MenuItem>

              <Menu
                anchorEl={anchorEl2} // Set anchor for dropdown
                open={dropdownOpen2} // Open state for dropdown
                onClose={handleCloseMenu} // Close dropdown
                sx={{ mt: 2 }}
              >
                <MenuItem
                  onClick={() => {
                    setActive("help");
                    navigate("/");
                    setDropdownOpen(false);
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "500",
                    }}
                  >
                    Get in touch
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setActive("help");
                    navigate("/");
                    setDropdownOpen(false);
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "500",
                    }}
                  >
                    FAQ
                  </Typography>
                </MenuItem>
              </Menu>
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
                  fontFamily: "Raleway",
                  textDecoration: "none",
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
                    fontFamily: "Raleway",
                  }}
                ></Box>
                <MenuItem
                  style={{
                    fontFamily: "Raleway",
                  }}
                >
                  Webinar
                </MenuItem>
                <MenuItem
                  style={{
                    fontFamily: "Raleway",
                  }}
                >
                  Who we are?
                </MenuItem>
                <MenuItem
                  style={{
                    fontFamily: "Raleway",
                  }}
                >
                  FAQ
                </MenuItem>
                <MenuItem
                  style={{
                    fontFamily: "Raleway",
                  }}
                >
                  Get in touch
                </MenuItem>
                <Divider />

                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    target="_blank"
                    sx={{ width: "100%" }}
                    style={{
                      backgroundColor: "#9CD161",
                      letterSpacing: "0.09rem",
                      color: "white",
                      border: "0px",
                    }}
                  >
                    {!isLoggedIn && (
                      <Link
                        to={"/login"}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontFamily: "Raleway",
                        }}
                      >
                        Resgister Now
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
