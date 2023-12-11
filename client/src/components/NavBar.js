import React, { useEffect, useState } from "react";
import { SiSwiggy } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { verifyjwtToken } from "../utilis/loginApi";
import { removeUser } from "../utilis/userSlice";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = ({ showSeachBar }) => {
  const cartItem = useSelector((store) => store.cart.item);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const navigate = useNavigate()
  const userDetails = useSelector((store) => store.userDetails.data);
  const dispatch = useDispatch();
  const value =
    cartItem?.menu_data?.reduce((prev, curr) => {
      return prev + curr?.count;
    }, 0) || 0;

  const [color, setColor] = useState(value > 0 ? true : false);
  useEffect(() => {
    if (userDetails !== null) verifyjwt();
  });
  useEffect(() => {
    setColor(value > 0 ? true : false);
  }, [value]);

  async function verifyjwt() {
    const result = await verifyjwtToken(userDetails.token);
    if (!result.status) {
      localStorage.removeItem("user");
      dispatch(removeUser());
    }
  }

  function logout(){
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <Navbar id="navBar-container">
      <Link to="/">
        <SiSwiggy className="img-icon123" />
      </Link>
      <Nav id="links-container">
        <div className="items-conatiner" onClick={showSeachBar}>
          <FiSearch className="icons" />
          <div className="field-name">Search</div>
        </div>
        <Link to="/offers">
          <div className="items-conatiner">
            <BiSolidOffer className="icons" />
            <div className="field-name">Offers</div>
          </div>
        </Link>
        <div className="items-conatiner">
          <IoHelpBuoyOutline className="icons" />
          <div className="field-name">Help</div>
        </div>

        {userDetails === null ? (
          <div className="items-conatiner">
            <VscAccount className="icons" onClick={handleShow} />
            <div onClick={handleShow} className="field-name">
              Sign In
            </div>
            <Login show={show} handleClose={handleShow} />
          </div>
        ) : (
          <Dropdown >
            <Dropdown.Toggle
            variant=""
              className="items-conatiner"
            >
              <VscAccount className="icons" />
              <div className="field-name">
                {userDetails.data.fullName.split(" ")[0]}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <LinkContainer to="/account">
          <Dropdown.Item>Profile</Dropdown.Item>
        </LinkContainer>
              <Dropdown.Item onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {userDetails !== null ? (
          <Link to="checkout">
            <div className="items-conatiner">
              <div id={!color ? "cart-items" : "cart-items1"}>{value}</div>
              <div className="field-name">Cart</div>
            </div>
          </Link>
        ) : (
          <div className="items-conatiner" onClick={handleShow}>
            <div id={!color ? "cart-items" : "cart-items1"}>{value}</div>
            <div className="field-name">Cart</div>
            <Login show={show} handleClose={handleShow} />
          </div>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
