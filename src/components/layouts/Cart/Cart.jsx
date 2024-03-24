import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProducts,
  removeProductFromCart,
  placeOrder,
} from "../../../Redux/Slices/HomePageSlice";
import PaymentBtn from "../PaymentBtn/PaymentBtn";
import Footer from "../Footer/Footer";
import Header from "../../common/Header/Header";

const Cart = () => {
  const [totalPayment, setTotalPayment] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.homeSlice.allCartProducts);
  const orderData = useSelector((state) => state.homeSlice.order);

  const user = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getCartProducts(user));
  }, []);

  const productsInCart = cart && cart.length > 0 ? cart[0].cartDetails : [];

  const handleRemovalFromCart = async (indexNum) => {
    await dispatch(removeProductFromCart( indexNum ));
    await dispatch(getCartProducts( user ));
  };

  useEffect(() => {
    let totalAmount = 0;
    productsInCart?.forEach((product) => {
      totalAmount += product.price;
    });
    setTotalPayment(totalAmount);
  }, [productsInCart]);

  console.log("Total Payment:", totalPayment);

  console.log("Order: ", orderData);

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cartProducts">
          {productsInCart?.map((cartProduct, index) => (
            <div className="cartProduct" key={index}>
              <div className="product_image">
                <img
                  src={`http://localhost:5001/product/uploads/${cartProduct.product_images?.[0]}`}
                  alt=""
                />
              </div>
              <div className="product_content">
                <div className="product_name">
                  <h3>{cartProduct.product_name}</h3>
                </div>
                <div className="product_price">
                  <h3>{cartProduct.price}</h3>
                  <div className="discount">
                    <p className="discount_price">discount</p>
                    <p className="mrp">MRP</p>
                  </div>
                </div>
              </div>
              <div className="deleteBtn">
                <i
                  className="material-symbols-outlined"
                  onClick={() => handleRemovalFromCart(index)}
                >
                  delete
                </i>
              </div>
            </div>
          ))}
        </div>
        <div className="productPrice">
          <div className="priceShower">
            <div className="total_price">
              <h1>Total</h1>
              <div className="price">
                <div className="total_shower">
                  <h1>
                    <i>&#8377;</i> {totalPayment}
                  </h1>
                  <h6>
                    <i>&#8377;</i>mrp
                  </h6>
                  <p>
                    <i>&#8377;-</i>discount
                  </p>
                </div>
              </div>
            </div>
            <div className="payBtn">
              <div className="total_discount">
                <p>Discount</p>
                <h5>DiscountPrice</h5>
              </div>
              <div className="shipping_charge">
                <p>Shipping Charge</p>
                <h5>Shipping Price</h5>
              </div>
              <div className="total_pay_btn">
                <PaymentBtn
                  productsInCart={cart}
                  user={user}
                  totalPrice={totalPayment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
