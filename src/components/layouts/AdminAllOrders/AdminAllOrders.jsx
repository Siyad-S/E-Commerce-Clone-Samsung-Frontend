import React, { useEffect } from "react";
import "./AdminAllOrders.css";
import { getAllOrders } from "../../../Redux/Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";

const AdminAllOrders = () => {
  const dispatch = useDispatch();
  const allOrdersData = useSelector(
    (state) => state.adminSlice.allOrders.allOrders
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  function extractDateAndDay(timestamp) {
    const dateObject = new Date(timestamp);
    const date = dateObject.toDateString();
    const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
    return date;
  }

  console.log(allOrdersData);
  return (
    <div className="user_orders">
      <AdminDashBoard />
      <div className="userOrders_body">
        <div className="user_order_header">
          <h2>All Orders</h2>
        </div>
        <div className="order_cards">
          {allOrdersData?.map((order, orderIndex) => (
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

export default AdminAllOrders;
