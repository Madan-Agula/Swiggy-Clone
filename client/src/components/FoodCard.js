import "../styles/FoodCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { SWIGGY_URL } from "../utilis/Swiggyapi";
import { FaStar } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";



const FoodCard = ({itemsList }) => {
  const cuisines = itemsList?.cuisines.reduce(
    (prev, curr) => (prev.length === 0 ? prev + curr : prev + "," + curr),
    ""
  );

  return (
    <Card className="card-container" >
      <div id="img-container">
        <Card.Img
          className="img"
          src={SWIGGY_URL + itemsList?.cloudinaryImageId}
        />
      </div>
      <Card.Body className="card-body">
        <Card.Title id="card-title">{itemsList.name}</Card.Title>
        <div id="cuisines">{cuisines}</div>
        <div className="list-items">
          <span id={itemsList?.avgRating>=4.0 ?"span-item1" : "span-item11"}><FaStar className="icon"/>{itemsList.avgRating}</span>
          <span>{itemsList?.deliveryTime}</span>
          <span>{itemsList?.costForTwo}</span>
        </div>
        
        <hr></hr>
        <div className="flat-discount">{itemsList.discount.length!==0?
        <><BiSolidOffer className="discount" />
        <span>{itemsList?.discount}</span></>:""
        }
        </div>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;

