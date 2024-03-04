import React from "react";
import "./PaymentBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../../../Redux/Slices/HomePageSlice";

const PaymentBtn = ({ productsInCart, user, totalPrice }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.homeSlice.order);

  const handleCheckout = () => {
    dispatch(
      placeOrder({
        cartData: productsInCart[0].cartDetails,
        userId: user._id,
        totalPrice: totalPrice,
      })
    );
  };
  console.log(productsInCart);

  return (
    <div>
      <button className="buy_now" onClick={() => handleCheckout()}>
        Place Order
      </button>
    </div>
  );
};

export default PaymentBtn;
