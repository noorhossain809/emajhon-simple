import React, { useContext } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import logo from "../../images/images/logo.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.6),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = (props) => {
  const { cart } = props;
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  return (
    <div>
      <div className="header-container">
        <img src={logo} alt="" />
      </div>
      <div className="div">
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
          <Container fluid>
            <Navbar.Brand href="#"></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className=" me-auto my-2 my-lg-0 p-2"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link className="navbar" to="/">
                  Home
                </Link>
                <Link className="navbar" to="/shop">
                  Shop
                </Link>
                <Link className="navbar" to="/review">
                  Order review
                </Link>
                <Link className="navbar" to="/inventory">
                  Manage inventory
                </Link>
              </Nav>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Form className="d-flex">
                <FontAwesomeIcon
                  style={{ width: "50px", height: "30px" }}
                  className="text-white m-3"
                  icon={faShoppingCart}
                >
                  {cart.length}
                </FontAwesomeIcon>

                  
                
                  {loggedInUser.email? <Link onClick={() => setLoggedInUser({})} className="navbar" to="">Sign out </Link>: <Link className="navbar" to="/login">
                  Log in
                </Link>}
                
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
