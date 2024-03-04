import React, { useEffect } from "react";
import "./CheckoutSuccess.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findSession } from "../../../Redux/Slices/HomePageSlice";
import "./CheckoutSuccess.css"

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const sessionPayment = useSelector((state) => state.homeSlice.paymentDetails);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log("data",searchParams);
  const id = searchParams.get("id");
  console.log(id);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(findSession({ orderId: id }));
  }, [dispatch, id]);

  // const orderData = searchParams.get("orderData");
  // console.log(orderData);


  console.log("sessionPayment: ",sessionPayment)

  return (
      <div className="success-animation">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
        <div className="redirect_curr_ordered" onClick={() => navigate("/currently-ordered", {state: {sessionDetails :sessionPayment, currentOrderId: id}})}><p>Go to check currently ordered items</p><i className="material-symbols-outlined">arrow_forward</i></div>
      </div>
  );
};

export default CheckoutSuccess;
