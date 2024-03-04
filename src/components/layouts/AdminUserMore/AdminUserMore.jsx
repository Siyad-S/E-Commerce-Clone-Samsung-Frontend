import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOrders, getUser } from "../../../Redux/Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUserMore.css";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";

const AdminUserMore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.adminSlice.allOrders);
  const userData = useSelector((state) => state.adminSlice.user.singleUser);
  const { allOrders } = orders;
  // const { userName } = userData;
  const [usersOrders, setUsersOrders] = useState([]);

  useEffect(() => {
    dispatch(getUser({ Id: id }));
    dispatch(getAllOrders());
  }, [dispatch, id]);

  useEffect(() => {
    if (allOrders) {
      const order = allOrders?.filter((product) => product.userId === id);
      setUsersOrders(order);
    }
  }, [allOrders, id]);

  console.log(usersOrders);
  // console.log("user: ", userData);

  function extractDateAndDay(timestamp) {
    const dateObject = new Date(timestamp);
    const date = dateObject.toDateString();
    const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
    return date;
  }

  return (
    <div className="user_orders">
      <div className="dashboard">
        <AdminDashBoard />
      </div>
      <div className="userOrders_body">
        <div className="user_order_header">
          <h2>Orders of {userData?.userName}</h2>
        </div>
        <div className="order_cards">
          {usersOrders.length > 0 &&
            usersOrders.map((order, orderIndex) => (
              <div className="order_card_admin" key={orderIndex}>
                <div className="cards">
                  {order.products.map((product, productIndex) => (
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
                        <p>
                          Ordered date: {extractDateAndDay(order.orderDate)}
                        </p>
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

export default AdminUserMore;
