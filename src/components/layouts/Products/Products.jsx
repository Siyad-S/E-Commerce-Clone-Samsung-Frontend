import React, { useEffect, useState } from "react";
import "./Products.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Redux/Slices/HomePageSlice";
import Footer from "../Footer/Footer";
import Header from "../../common/Header/Header";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state.homeSlice.allProducts.allProducts
  );
  const { id } = useParams();
  const [productsBySubCat, setProductsBySubCat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  useEffect(() => {
    const subCatProducts = [];
    allProducts?.map((products) => {
      if (products.sub_category_id === id) {
        subCatProducts.push(products);
        setProductsBySubCat(subCatProducts);
      }
    });
  }, [allProducts]);

  console.log(productsBySubCat);

  return (
    <>
      <Header />
      <div className="product_page">
        {productsBySubCat?.map((product, index) => (
          <div
            className="product_card"
            key={index}
            onClick={() => navigate(`/singleProduct/${product._id}`)}
          >
            <div className="add_wishlist">
              <i className="material-symbols-outlined">favorite </i>
            </div>
            <div className="image">
              <img
                src={`http://localhost:5001/product/uploads/${product.product_image}`}
                alt=""
              />
            </div>
            <div className="product_name">
              <h4>{product.product_name}</h4>
            </div>
            <div className="price">
              <h4>
                <i>&#8377;</i>
                {product.price}
              </h4>
            </div>
            <div className="discount">
              <p>
                <i>&#8377;</i>mrp
              </p>
              <h5>
                save <i>&#8377;</i>discount
              </h5>
            </div>
            <div className="buyNow_btn">
              <button onClick={() => navigate(`/singleProduct/${product._id}`)}>
                Buy now
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Products;
