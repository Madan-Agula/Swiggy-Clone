import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMenuData } from "../utilis/useMenuData";
import Shimmer from "./Shimmer";
import { FaStar } from "react-icons/fa6";
import "../styles/menuCard.css";
import { MdDeliveryDining } from "react-icons/md";
import { CgTimelapse } from "react-icons/cg";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import ItemsCard from "./ItemsCard";
import { useOneRestaurantData } from "../utilis/Swiggyapi";

function MenuList() {
  const param = useParams();
  const menuDetails = useMenuData(param.id);
  const restaurantData = useOneRestaurantData(param.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <>
      {menuDetails === null || restaurantData ===null ? (
        <div className="shim-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      ) : (
        <div className="menu-card">
          <div className="restuarant-details">
            <div className="restuarant-name">
              <div className="name">{restaurantData[0].name}</div>
              <div className="cuisines">{restaurantData[0].cuisines[1]}</div>
              <div className="locality">
                {restaurantData[0].areaName}
              </div>
              <div className="distance">
                <MdDeliveryDining className="mddelivery" />
                {restaurantData[0].feeDetails}
              </div>
            </div>
            <div className="rating-container1234">
            <div className="res-rating">
              <div id="avgrating">
                <FaStar className="icon1" />
                {restaurantData[0].avgRating}
              </div>
              <hr className="hrating"></hr>
              <div id="rating">{restaurantData[0].totalRatingsString}</div>
            </div>
          </div>
          </div>
          <hr className="dash"></hr>
          <div className="time-container">
            <span className="time">
              <CgTimelapse className="timendcurr" />
              {restaurantData[0].maxDeliveryTime}
            </span>
            <span className="time">
              <HiOutlineCurrencyRupee className="timendcurr" />
              {restaurantData[0].costForTwo}
            </span>
          </div>

          <hr></hr>
          <div className="recommended">{`Recommended (${
            menuDetails[0].menuLists.length})`}</div>
          <div className="border"></div>

          {menuDetails[0].menuLists?.map((item) =>
                <ItemsCard
                  key={item.id}
                  item={item}
                  param={param.id}
                />
              )}
          <div className="border"></div>
        </div>
      )}
    </>
  );
}

export default MenuList;
