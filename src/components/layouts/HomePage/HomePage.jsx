import React from "react";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../Redux/Slices/HomePageSlice";
import FooterSearch from "../FooterSearch/FooterSearch";
import HomeCarousel from "../HomeCarousel/HomeCarousel";
import HomeDisplay from "../HomeDisplay/HomeDisplay";
import WeekHighlights from "../WeakHighlights/WeekHighlights";

const HomePage = () => {
  const [productHomeData, setProductHomeData] = useState([]);
  const [tvDisplayTypes, setTvDisplayTypes] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const allProducts = useSelector(
    (state) => state.homeSlice.allProducts.allProducts
  );
  const dispatch = useDispatch();
  const ids = {
    main_mob: "65c71ca7c32ae88b7f92d5fb",
    tablets: "65c746c6aa759b1647940e4f",
    watch: "65c746eeaa759b1647940e52",
    smartphones: "65c74570aa759b1647940e1b",
  };

  const tvAvIds = {
    tvAv_main: "65c720f9aa759b1647940d28",
    tv_id: "65c748d5aa759b1647940e78",
  };

  const appliancesId = "65c72129aa759b1647940d2b";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = (mainId, subId) =>
    (allProducts || []).filter(
      (product) =>
        product.category_id === mainId && product.sub_category_id === subId
    );

  const filterProductByMainId = (mainId) =>
    (allProducts || []).filter((product) => product.category_id === mainId);

  const handleMobileProduct = () => {
    const mobile = filterProducts(ids?.main_mob, ids?.smartphones)
      .reverse()
      .slice(0, 1);
    const tablets = filterProducts(ids?.main_mob, ids?.tablets)
      .reverse()
      .slice(0, 1);
    const watches = filterProducts(ids?.main_mob, ids?.watch)
      .reverse()
      .slice(0, 1);
    setProductHomeData([...mobile, ...tablets, ...watches]);
  };

  const handleTvData = () => {
    const latestTvs = filterProducts(tvAvIds?.tvAv_main, tvAvIds?.tv_id)
      .reverse()
      .slice(0, 5);
    setTvDisplayTypes([...latestTvs]);
  };

  const handleAppliances = () => {
    const latestAppliances = filterProductByMainId(appliancesId)
      .reverse()
      .slice(0, 5);
    setAppliances([...latestAppliances]);
  };

  useEffect(() => {
    handleMobileProduct();
    handleTvData();
    handleAppliances();
  }, [allProducts]);

  return (
    <div>
      <HomeCarousel />
      <WeekHighlights />
      <HomeDisplay data={productHomeData} title={"Mobile"} />
      <HomeDisplay data={tvDisplayTypes} title={"TV & AV"} />
      <HomeDisplay data={appliances} title={"Home Appliances"} />
      <FooterSearch />
    </div>
  );
};

export default HomePage;
