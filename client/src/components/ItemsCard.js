import React, { useEffect, useState } from "react";
import "../styles/itemCard.css";
import VegIcon from "../assets/icon-veg.png";
import NonVegIcon from "../assets/non-veg-icon.jpg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { SWIGGY_URL } from "../utilis/Swiggyapi";
import Noimage from "../assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems, updateItems } from "../utilis/cartSlice";
import CustomModal from "./CustomModal";

function ItemsCard({ item, param }) {
  const data = item;
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const cartItem = useSelector((store) => store.cart.item);
  const handleImageError = (event) => {
    event.target.src = Noimage;
  };

  const [value, setValue] = useState(
    cartItem?.menu_data?.filter((i) => i.data.id === data.id)[0]?.count || 0
  );

  const handleAddItems = (data, id) => {
    if (cartItem.id === undefined) {
      dispatch(addItems({ id, data }));
      setValue(
        (cartItem?.menu_data?.filter((i) => i.data.id === data.id)[0]?.count ||
          0) + 1
      );
    } else if (cartItem.id === param) {
      dispatch(updateItems(data));
      setValue(
        (cartItem?.menu_data?.filter((i) => i.data.id === data.id)[0]?.count ||
          0) + 1
      );
    } else {
      setModalShow(true);
    }
  };

  const handleRemoveItems = (data) => {
    if (cartItem.id === param && value > 0) {
      dispatch(removeItems({ data, value }));
      setValue(
        cartItem?.menu_data?.filter((i) => i.data.id === data.id)[0]?.count - 1
      );
    }
  };

  const handleChange = () => {
    setModalShow(false);
    setValue(
      (cartItem?.menu_data?.filter((i) => i.data.id === data.id)[0]?.count ||
        0) + 1
    );
  };

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(cartItem));
  }, [cartItem]);
  
  return (
    <>
      <div className="items-details">
        <div className="items-list">
          <div className="active-icon">
            <img
              src={
                data?.vegClassifier === "NONVEG"
                  ? NonVegIcon
                  : VegIcon
              }
              alt="veg"
            />
          </div>
          <div className="item-name">{data.name}</div>
          <div>
            <LiaRupeeSignSolid />
            {parseInt(data.price)}
          </div>
          <div className="description">{data.description}</div>
        </div>
        <div className="img-icon1">
          <img
            className="image"
            src={SWIGGY_URL + data.imageId}
            alt="ima-icon"
            onError={handleImageError}
          />
          {value === 0 ? (
            <div
              className="btn-add"
              onClick={() => handleAddItems(data, param)}
            >
              Add
            </div>
          ) : (
            <div className="btn-add-sub">
              <button
                className="negative"
                onClick={() => handleRemoveItems(data)}
              >
                -
              </button>
              <span>{Number(value)}</span>
              <button onClick={() => handleAddItems(data, param)}>+</button>
            </div>
          )}
        </div>
      </div>
      <hr className="hr-tag"></hr>

      {modalShow ? (
        <CustomModal data={data} param={param}
          handleChange={handleChange}
          handleClick={()=>setModalShow(false)}
          onHide={() => setModalShow(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ItemsCard;
