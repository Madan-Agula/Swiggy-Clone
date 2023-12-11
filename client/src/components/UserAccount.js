import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/UserAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utilis/userSlice";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const UserAccount = () => {
  const userDetails = useSelector((store) => store.userDetails.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(removeUser());
    navigate("/");
  }

 useEffect(()=>{
  window.scrollTo(0,0)
 },[]);

  return (
    <div className="user-account">
      <Container>
        <Row>
          <Col>
            <div className="user-header">
              <div className="user-details">
                <div className="user-logout" onClick={logout}>
                  Logout
                </div>
                <div className="user-name">{userDetails.data.fullName}</div>
                <div className="user-email">{userDetails.data.email}</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="user-section">
            <div className="user-section-1">
                <div className="user-link">Orders</div>
                <div className="user-link">Favourites</div>
              
              <LinkContainer to="/checkout">
                <div className="user-link">Cart</div>
              </LinkContainer>
              <LinkContainer to="/offers">
                <div className="user-link">Offers</div>
              </LinkContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserAccount;
