import React, { useEffect, useState } from "react";
import "./SearchModal.css";
import { searchProducts } from "../../../Redux/Slices/HomePageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const searchModal = ({ setOpenSearch }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.homeSlice.search.productsData);
  const [openSearchList, setOpenSearchList] = useState(false);
//   const [searched, setSearched] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (search !== "") {
      dispatch(searchProducts(search));
    }
  }, [search]);

  console.log("searched:", products);
  return (
    <>
      <div className="close_btn">
        <i
          className="material-symbols-outlined"
          onClick={() => setOpenSearch(false)}
        >
          close
        </i>
      </div>
      <div className="search_modal">
        <div className="search_modal_title">
          <h1>What are you looking for?</h1>
        </div>
        <div className="search_data">
          <div className="search_input">
            <i className="material-symbols-outlined">search</i>
            <input
              name="footer_search"
              type="search"
              placeholder="Search Keyword"
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenSearchList(true);
              }}
            />
          </div>
          {openSearchList && (
            <div className="search_data">
              <h3>Search Results</h3>
              {products?.map((product, index) => (
                <ul key={index}>
                  <li onClick={() => navigate(`/singleProduct/${product._id}`)}>
                    {product.product_name}
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default searchModal;
