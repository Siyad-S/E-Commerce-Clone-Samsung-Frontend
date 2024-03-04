import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../../Redux/Slices/HomePageSlice";
import "./WeekHighlights.css";
import { useNavigate } from "react-router-dom";

const WeekHighlights = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state.homeSlice.allProducts.allProducts
  );
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("");

  const mobiles_id = "65c71ca7c32ae88b7f92d5fb";
  const smartPhones_id = "65c74570aa759b1647940e1b";
  const tvAv_id = "65c720f9aa759b1647940d28";
  const tv_id = "65c748d5aa759b1647940e78";
  const appliances_id = "65c72129aa759b1647940d2b"

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filterProductsByCategory = (category_id, sub_category_id) => {
    setSelectedBtn(true)
    if (category_id && sub_category_id) {
      return allProducts.filter(
        (product) =>
          product.category_id === category_id &&
          product.sub_category_id === sub_category_id
      );
    } else if (category_id) {
      return allProducts.filter(
        (product) => 
        product.category_id === category_id
      );
    }
  };

  useEffect(() => {
    if (allProducts) {
      setProducts(filterProductsByCategory(mobiles_id, smartPhones_id));
    }
  }, [allProducts]);

  // const navigateToSingleProduct = (id) => {
  //   dispatch(fetchSingleProduct(id))
  //   navigate('/singleProduct');
  // }

  return (
    <div className="week_highLight">
      <div className="highlight_title">
        <h1>This Week's Highlights</h1>
      </div>
      <div className="highlight_menu">
        <ul>
          <li>
            <button
              className={selectedBtn === "Mobile" ? "selected" : "unSelected"}
              onClick={() => {
                setProducts(
                  filterProductsByCategory(mobiles_id, smartPhones_id)
                );
                setSelectedBtn("Mobile")
              }}
            >
              Mobile
            </button>
          </li>
          <li>
            <button
              className={selectedBtn === "Tv" ? "selected" : "unSelected"}
              onClick={() => {
                setProducts(filterProductsByCategory(tvAv_id, tv_id));
                setSelectedBtn("Tv")
              }}
            >
              Tv
            </button>
          </li>
          <li>
            <button
              className={selectedBtn === "Appliances" ? "selected" : "unSelected"}
              onClick={() => {
                setProducts(filterProductsByCategory(appliances_id));
                setSelectedBtn("Appliances")
              }}
            >
              Appliances
            </button>
          </li>
        </ul>
      </div>
      <div className="highlight_products">
        {products.map((product, index) => {
          if (index >= 0 && index < 1) {
            return (
              <div key={index} className="major_product" onClick={() => navigate(`/singleProduct/${product._id}`)}>
                <div className="product_image">
                  <img
                    src={`http://localhost:5001/product/uploads/${product.product_image}`}
                    alt=""
                  />
                </div>
                <div className="priceName">
                  <h2>{product.product_name}</h2>
                  <h2>
                    Starting <i>&#8377;</i> {product.price}*
                  </h2>
                  <button>Buy now</button>
                </div>
              </div>
            );
          }
        })}
        <div className="minor_products">
          <div className="product1">
            {products.map((product, index) => {
              if (index >= 1 && index < 3) {
                return (
                  <div key={index} className="minor_product1"  onClick={() => navigate(`/singleProduct/${product._id}`)}>
                    <div className="product_image1">
                      <img
                        src={`http://localhost:5001/product/uploads/${product.product_image}`}
                        alt=""
                      />
                    </div>
                    <div className="minor_namePrice1">
                      <h2>{product.product_name}</h2>
                      <h2>
                        Starting <i>&#8377;</i> {product.price}*
                      </h2>
                      <button>Buy now</button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="product2">
            {products.map((product, index) => {
              if (index >= 3 && index < 5) {
                return (
                  <div key={index} className="minor_product2"  onClick={() => navigate(`/singleProduct/${product._id}`)}>
                    <div className="product_image2">
                      <img
                        src={`http://localhost:5001/product/uploads/${product.product_image}`}
                        alt=""
                      />
                    </div>
                    <div className="minor_namePrice2">
                      <h2>{product.product_name}</h2>
                      <h2>
                        Starting <i>&#8377;</i> {product.price}*
                      </h2>
                      <button>Buy now</button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeekHighlights;
