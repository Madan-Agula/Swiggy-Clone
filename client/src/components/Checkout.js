import React, { useEffect, useState } from "react";
import "../styles/checkout.css";
import veg1 from "../assets/icon-veg.png";
import Noimage from "../assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { SWIGGY_URL, useOneRestaurantData } from "../utilis/Swiggyapi";
import Spinner from "react-bootstrap/Spinner";
import NonVegIcon from "../assets/non-veg-icon.jpg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { paymentAdd, paymentRemove } from "../utilis/cartSlice";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";


function Checkout() {
  const [cod, setCod] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((store) => store.cart.item);
  const menuDetails = useOneRestaurantData(cartItem.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const delvfee = menuDetails !== null ?(menuDetails[0]?.extrafee) : 0;
  const grandTotal = cartItem.menu_data.reduce(
    (prev, curr) =>
      prev +
      (parseInt(curr.data.price)) *
        curr.count,
    0
  );

  const handleImageError = (event) => {
    event.target.src = Noimage;
  };

  const handleAddItems = (data) => {
    dispatch(paymentAdd(data));
  };

  const handleRemoveItems = (data, value) => {
    dispatch(paymentRemove({ data, value }));
  };
  useEffect(()=>{
    localStorage.setItem('item',JSON.stringify(cartItem));
  },[cartItem]);

  return (
    <>
      {menuDetails === null ? (
        <div className="checkout-container"><Spinner
          animation="border"
          variant="primary"
         className="spinner"
        /></div>
      ) : (
        <div className="checkout-container">
        <div className="checkout-details-container">
          <div className="checkout-details">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/restuarant-menu/${menuDetails[0].name}/${menuDetails[0]._id}`}
              key={menuDetails[0].id}
            >   
              <div className="restuarant-payment">
                <div className="im-res">
                  <img
                    src={SWIGGY_URL + menuDetails[0].cloudinaryImageId}
                    onError={handleImageError}  alt="cloudimg"
                  />
                </div>
                <div className="res1-details">
                  <span className="menu-name">{menuDetails[0].name}</span>
                  <span className="menu-loc">{menuDetails[0].areaName}</span>
                  <hr className="hr-res-detail"></hr>
                </div>
              </div>
            </Link>
            <div className="amount-section">
              {cartItem.menu_data.map((item) => (
                <div className="item-list-payment" key={item.data.id}>
                  <div className="imgicon">
                    <img
                      className="imgicon"
                      src={
                        item.data?.vegClassifier === "NONVEG"
                          ? NonVegIcon
                          : veg1
                      }
                      alt="veg-icon"
                    />
                  </div>
                  <div className="img-detail-pay">{item?.data?.name}</div>
                  <div className="btn-add-sub1">
                    <button
                      className="negative1"
                      onClick={() => handleRemoveItems(item, item?.count)}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button onClick={() => handleAddItems(item)}>+</button>
                  </div>
                  <div className="price-field">
                  <LiaRupeeSignSolid />
                    {parseInt(item.data.price) * item.count}
                  </div>
                </div>
              ))}
              <div>
                <input
                  className="textarea"
                  placeholder="Any suggestions? We will pass it on..."
                  maxLength="140"
                />
              </div>
              <div className="cod">
                <input type="checkbox" onClick={() => setCod(!cod)} />
                {!cod ? (
                  <div className="cod-details">
                    <b>Opt in for No-contact Delivery </b>
                    <p>
                      Unwell, or avoiding contact? Please select no-contact
                      delivery. Partner will safely place the order outside your
                      door (not for COD)
                    </p>
                  </div>
                ) : (
                  <div className="cod-details">
                    <b>Opt in for No-contact Delivery </b>
                    <p>
                      Our delivery partner will call to confirm. Please ensure
                      that your address has all the required details.
                    </p>
                  </div>
                )}
              </div>
              <hr className="pay-hr"></hr>
              <div className="bill">
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Bill Details
                </div>
                <div className="bill-rec">
                  <span>Item Total</span>
                  <span>
                    <LiaRupeeSignSolid />
                    {grandTotal}
                  </span>
                </div>
                <div className="bill-rec">
                  <span>
                    Delivery Fee |{" "}
                    {menuDetails[0]?.feeDetails?.split("|")[0]}
                  </span>
                  <span>
                    <LiaRupeeSignSolid /> {delvfee}{" "}
                  </span>
                </div>
              </div>
              <hr className="pay-hr"></hr>
            </div>
            <div className="restuarant-payment1234">
              <div className="bill-rec1">
                <span>TO PAY</span>
                <span>
                  <LiaRupeeSignSolid />
                  {grandTotal + parseInt(delvfee)}
                </span>
              </div>
            </div>
         </div>
            <div className="cancel-p">
            <div className="cancel-pp">
              <div className="cancel-p1">
                Review your order and address details to avoid cancellations
              </div>
              <div className="cancel-p2">
                {" "}
                <span style={{color:"red"}}>Note: </span>If you cancel within 60 seconds of placing
                your order, a 100% refund will be issued. No refund for
                cancellations made after 60 seconds.
              </div>
              <div className="cancel-p3">
                Avoid cancellation as it leads to food wastage.{" "}
              </div>
              <div className="cancel-p4">Read cancellation policy</div>
            </div>
          </div>
        </div>
        <div className="addres-payment-container">
          <div className="address-container">
              <b>Delivery address</b>
              <CiLocationOn className="acc-icon-log" />
          </div>
          <div className="payment-container">
              <b>Payment method</b>
              <MdOutlinePayments className="acc-icon-log" />
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
