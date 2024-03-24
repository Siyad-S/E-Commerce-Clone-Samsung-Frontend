import React, { useEffect, useState } from "react";
import "./FooterSearch.css";
import Footer from "../Footer/Footer";
import { searchProducts } from "../../../Redux/Slices/HomePageSlice";
import { useDispatch, useSelector } from "react-redux";

const FooterSearch = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.homeSlice.search.productsData);
  useEffect(() => {
    if (search !== "") {
      dispatch(searchProducts(search));
    }
  }, [search]);

  console.log("searched:", products);
  return (
    <>
      <div className="search_footer">
        <div className="search_footer_title">
          <h1>Looking for something else?</h1>
        </div>
        <div className="search_input">
          {/* <button><span className="material-symbols-outlined">search</span></button> */}
          {/* <label htmlFor="footer_search">Search Keyword</label> */}
          <i className="material-symbols-outlined">search</i>
          <input
            name="footer_search"
            type="search"
            placeholder="Search Keyword"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FooterSearch;
