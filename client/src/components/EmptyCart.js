import React from "react";
import Card from "react-bootstrap/Card";
import emptycart from "../assets/emptyCart.webp";
import "../styles/emptycart.css";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="emptycart-container">
      <Card className="emptycart">
        <div className="image1">
          <Card.Img variant="top" className="img" src={emptycart} />
        </div>
        <div className="text1">Your cart is empty</div>
        <div className="text">
          You can go to home page to view more restaurants
        </div>
        <Link to="/">
          <button className="allinone">SEE RESTAURANTS NEAR YOU</button>
        </Link>
      </Card>
    </div>
  );
}

export default EmptyCart;
