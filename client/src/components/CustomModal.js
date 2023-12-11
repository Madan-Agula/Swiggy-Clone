import "../styles/custommodal.css";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { addItems, clearCart } from "../utilis/cartSlice";

function CustomModal({ data,param,handleChange,handleClick }) {
  const cartItem = useSelector((store)=>store.cart.item)
  const dispatch = useDispatch();
  const handleRemove = () => {
    const id = param;
    dispatch(clearCart());
    dispatch(addItems({ id, data }));  
    sessionStorage.setItem("item", JSON.stringify(cartItem));
    handleChange();
  };
  return (
    <Modal
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-container12">
        <div className="header">Items already in cart</div>
        <div className="para">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </div>
        <div className="btn-container12">
          <button className="login-btn12" onClick={handleClick}>
            <div className="t212">NO</div>
          </button>
          <button className="login-btn12 signin12" onClick={handleRemove}>
            <div className="t212">YES, START A FRESH</div>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
