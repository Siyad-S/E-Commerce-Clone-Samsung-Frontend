import React, { useEffect } from "react";
import "./CurrentlyOrdered.css";
import { useLocation } from "react-router-dom";
import { currentOrder } from "../../../Redux/Slices/HomePageSlice";
import { useDispatch, useSelector } from "react-redux";

const CurrentlyOrdered = () => {
const dispatch = useDispatch()
  const currentlyOrders =useSelector((state)=>state.homeSlice.currentOrders)
  const location = useLocation();

  const currentOrderId = location.state.currentOrderId;
  const paymentData = location.state.sessionDetails

  console.log(paymentData);

  useEffect(() => {
    dispatch(currentOrder({orderId:currentOrderId}))
  },[dispatch, currentOrderId])

  const currentlyOrdered = currentlyOrders?.getSingleOrder
  console.log(currentlyOrdered?.orderDate);
  // console.log(currentlyOrders.orderDate);
  // log

// const order = () => {
//   dispatch(currentOrder(orderId))
// }

//   console.log(currentlyOrders);

  // const { getSingleOrder } = currentlyOrdered
  const { paymentDetails } = paymentData

  console.log("currently data:", paymentDetails);
  // console.log("currentOrderId:", currentOrderId);
  // console.log("singleOrderData:",currentlyOrdered);

  // const { orderStatus, orderDate, totalPrice, products } = currentlyOrders;
  // console.log(orderStatus);
  // console.log(orderDate);
  // console.log(totalPrice);
  // console.log(products);
  // //shipping_details.address, name
  const { customer_details, payment_method_types, shipping_details, status } = paymentDetails;
  console.log(customer_details);
  console.log(payment_method_types);
  console.log(shipping_details);
  console.log(status);



  function extractDateAndDay(timestamp) {
    const dateObject = new Date(timestamp);
    const date = dateObject.toDateString();
    const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
    return { date, day };
  }
  const result = extractDateAndDay(currentlyOrdered?.orderDate);


  return (
    <div className="currently_ordered">
      {currentlyOrdered?.products?.map((order, index) => (
        <div className="current_order_card" key={index}>
          <div>
            <img src={`http://localhost:5001/product/uploads/${order.product_image}`} alt="" />
          </div>
          <div>
            <h2>Product : {order.product_name}</h2>
            <p>Price : {order.price}</p>
            <h5>Ordered Date : {result.date}</h5>
          </div>
        </div>
      ))}

      <div className="address">
        <div className="dlivery_address">
          <h3>Delivery Address :</h3>
          <div className="address_data">
            <h4>Customer Name : {paymentData?.paymentDetails?.shipping_details.name}</h4>
            <h5>Payment Status : {paymentData?.paymentDetails?.status}</h5>
            <div className="address">
              <div className="address_title">
                <h5>Shipping Adress : </h5>
              </div>
              <div className="address_data">
                <p>{paymentData?.paymentDetails?.shipping_details.address.city}</p>
                <p>{paymentData?.paymentDetails?.shipping_details.address.country}</p>
                <p>{paymentData?.paymentDetails?.shipping_details.address.line1}</p>
                <p>{paymentData?.paymentDetails?.shipping_details.address.line2}</p>
                <p>{paymentData?.paymentDetails?.shipping_details.address.state}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="download_invoice">
          <button>Download</button>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyOrdered;
