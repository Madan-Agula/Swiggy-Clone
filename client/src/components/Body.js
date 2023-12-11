import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import Shimmer from "./Shimmer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useOutletContext } from "react-router-dom";
import { useAllRestaurantsData } from "../utilis/Swiggyapi";

const Body = () => {
  const { show, showSeachBar } = useOutletContext();
  const [str, setStr] = useState("");
  const [resturantData, setResturantData] = useState([]);
  let [searchBarItems, setSearchBarItems] = useState([]);
  
  const result = useAllRestaurantsData(); 
  useEffect(()=>{
    setResturantData(result);
    setSearchBarItems(result);
  },[result])  

  const displaySaerchItems = (e) => {
    setStr(e.target.value);
    const dataFiltered = resturantData?.filter((items) =>
      items?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchBarItems(dataFiltered);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {show ? (
        <div className="search-container">
          <Form.Control
            className="d-flex justify-center w-50 me-2"
            type="text"
            placeholder="search dishes"
            onChange={(e) => {
              displaySaerchItems(e);
            }}
            value={str}
          />
          <Button
            variant="danger"
            onClick={() => {
              showSeachBar();
              setStr("");
              setSearchBarItems(resturantData);
            }}
          >
            Close
          </Button>
        </div>
      ) : (
        ""
      )}
      <div id="foodcard-container">
        {searchBarItems===null
          ? Array.from({ length: 10 }).map((_, index) => (
              <Shimmer key={index} />
            ))
          : searchBarItems.map((itemsList) => (
              <Link
                to={`/restuarant-menu/${itemsList.name}/${itemsList._id}`}
                key={itemsList._id}
              >
                {" "}
                <FoodCard itemsList={itemsList} />
              </Link>
            ))}
      </div>
    </>
  );
};

export default Body;
