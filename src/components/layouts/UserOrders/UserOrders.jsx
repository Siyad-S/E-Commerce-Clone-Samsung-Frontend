import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../Redux/Slices/AdminSlice";
import "./UserOrders.css";
import Header from "../../common/Header/Header";


const UserOrders = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector(
    (state) => state.adminSlice.allOrders.allOrders
  );
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  console.log(ordersData);

  const userData = localStorage.getItem("userId");
  const userObject = JSON.parse(userData);
  // console.log(userObject._id);

  useEffect(() => {
    if (ordersData) {
      const ordersOfUser = ordersData.filter(
        (order) => order.userId === userObject
      );
      setOrders(ordersOfUser);
    }
  }, [ordersData, userObject]);

  function extractDateAndDay(timestamp) {
    const dateObject = new Date(timestamp);
    const date = dateObject.toDateString();
    const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
    return date;
  }
  //   const result = extractDateAndDay(orderDate);

  return (
    <div>
      <div className="userOrders_body">
        <Header />
        <div className="user_order_header">
          <h2>All Orders</h2>
        </div>
        <div className="order_cards">
          {orders?.map((order, orderIndex) => (
            <div className="order_card" key={orderIndex}>
              <div className="cards">
                {order?.products?.map((product, productIndex) => (
                  <div className="card" key={productIndex}>
                    <div className="image">
                      <img
                        src={`http://localhost:5001/product/uploads/${product.product_image}`}
                        alt=""
                      />
                    </div>
                    <div className="name">
                      <p>{product.product_name}</p>
                    </div>
                    <div className="date_status">
                      <p>Ordered date: {extractDateAndDay(order.orderDate)}</p>
                      <p>Order status: {order.orderStatus}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total">
                <h3>Total Price: {order.totalPrice}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
