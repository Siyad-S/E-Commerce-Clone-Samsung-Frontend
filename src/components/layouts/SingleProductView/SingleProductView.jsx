import React, { useEffect, useState } from "react";
import "./SingleProductView.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleProduct,
  putProductToCart,
} from "../../../Redux/Slices/HomePageSlice";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../../common/Header/Header";
import { Cookies } from 'react-cookie';

const SingleProductView = () => {
  const cookies = new Cookies();
  const singleProduct = useSelector(
    (state) => state.homeSlice.singleProduct.getSingleProduct
  );
  // const addedProductToCart = useSelector((state) => state.homeSlice.registerFormData.cart);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDataId = localStorage.getItem("userId");
  const userToken = cookies.get('token')

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, fetchSingleProduct]);

  // const [productImage, setProductImage] = useState(singleProduct?.product_images?.[0]);

  // const changeImageByClick = (index) => {
  //   setProductImage(singleProduct?.product_images?.[index]);
  // };

  const [imageIndex, setImageIndex] = useState(0);

  // const makePayment = (token) => {
  //   const body = {
  //     token,
  //     product,
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   return fetch(`http://localhost:5001/payment`, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(body),
  //   })
  //     .then((response) => {
  //       console.log("Response: ", response);
  //       const { status } = response;
  //       console.log("Status: ", status);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const putToCartHandler = (productId) => {
    if (userToken !== undefined) {
      dispatch(
        putProductToCart({ user_id: userDataId, product_Id: productId })
      );
    }
  };

  console.log(singleProduct);

  return (
    <>
      <Header />
      <div className="singleProduct_view">
        {singleProduct && (
          <>
            <div className="header_bar">
              <h3>{singleProduct.product_name}</h3>
            </div>
            <div className="product_shower">
              <div className="images_shower">
                <div className="image_section">
                  <div className="main_image">
                    <img
                      src={`http://localhost:5001/product/uploads/${singleProduct?.product_images?.[imageIndex]}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="sub_images">
                  <div className="image_count">
                    <h5>Images({singleProduct.product_images.length})</h5>
                  </div>
                  <div className="images">
                    {singleProduct.product_images &&
                      singleProduct.product_images.map((image, index) => {
                        if (index >= 0 && index < 5) {
                          return (
                            <div key={index}>
                              <img
                                onMouseOver={() => setImageIndex(index)}
                                src={`http://localhost:5001/product/uploads/${image}`}
                                alt=""
                              />
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
              <div className="products_details">
                <div className="title_heart">
                  <h3>{singleProduct.product_name}</h3>
                  <i className="material-symbols-outlined">favorite</i>
                </div>
                <div className="features_list">
                  <p>{singleProduct.description}</p>
                </div>
                <div className="buy_options">
                  <div className="wish_add">
                    <i className="material-symbols-outlined">favorite</i>
                  </div>
                  <div className="buy_title">
                    <h5>{singleProduct.product_name}</h5>
                  </div>
                  <div className="feature_price">
                    <div className="feature">
                      {/* <span>256GB | 12GB </span>
                    <span>| Blue</span> */}
                    </div>
                    <div className="price">
                      <h6>MRP (Inclusive of all taxes)</h6>
                      <div>
                        <p>
                          <i>&#8377;</i>159999.00
                        </p>
                        <h6>{singleProduct.price}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="total_price">
                    <h6>Total</h6>
                    <h6>
                      <i>&#8377;</i>
                      {singleProduct.price}
                    </h6>
                  </div>
                  <div className="buy_option">
                    <button onClick={() => putToCartHandler(singleProduct._id)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProductView;
