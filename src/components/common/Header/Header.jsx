import React, { useEffect, useState } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  getSubCategory,
  userLogout
} from "../../../Redux/Slices/HomePageSlice";

import { useNavigate } from "react-router-dom";
import Login from "../../layouts/Login/Login";
import { Cookies } from 'react-cookie';


const Header = () => {
  const dispatch = useDispatch();
  const categoriesData = useSelector(
    (state) => state.homeSlice.allCategories.categories
  );
  const subCategory = useSelector(
    (state) => state.homeSlice.allSubCategories.subCategories
  );

  const userData = useSelector((state) => state.homeSlice.userData)

  // const userLogout = useSelector((loggedOutUser) => loggedOutUser.homeSlice.)
  const navigate = useNavigate();
  const [sub_cats, setSub_cats] = useState([]);
  const [subCat_boolean, setSubCat_boolean] = useState();
  const [userBoolean, setUserBoolean] = useState(false);
  const cookies = new Cookies();


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getSubCategory());
  }, []);

  const subCats = [];
  const findSubCategories = (category_id) => {
    setSubCat_boolean(true);
    subCategory?.map((sub_cat) => {
      if (sub_cat.mainCategoryId === category_id) {
        subCats.push(sub_cat);
        setSub_cats(subCats);
      }
    });
  };

  // const dropDownShower_OnMouseEnter = () => {
  //   setSubCat_boolean(true)
  // }
  const dropDownShower_OnMouseLeave = () => {
    setSubCat_boolean(false);
  };

  const handleUserMenu = () => {
    setUserBoolean(true);
  };
  const handleUserMenuOnLeave = () => {
    setUserBoolean(false);
  };
  const token = cookies.get('token')

  const handleCartEntrance = () => {
    if(token !== undefined) {
      navigate("/cart")
    } else {
      navigate("/login")
    }
  }

  const handleOrdersEntrance = () => {
    if (token !== undefined) {
      navigate("/user-orders")
    } else {
      navigate("/login")
    }
  }


  // console.log(user, token);

  return (
    <>
      <nav>
        <div className="header">
          <div className="logo">
            <div className="logo_image">
              <img
                onClick={() => navigate("/")}
                src="https://logos-world.net/wp-content/uploads/2020/04/Samsung-Symbol.png"
                alt=""
              />
            </div>
          </div>
          <div className="options">
            <div className="category">
              <ul className="categories">
                {categoriesData?.map((categories, index) => (
                  <li key={index}>
                    <span
                      onMouseEnter={() => findSubCategories(categories._id)}
                      onMouseLeave={dropDownShower_OnMouseLeave}
                    >
                      {categories.category}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="subCategory_dropdown">
                {sub_cats?.map((sub_category, index) => (
                  <li key={index}>
                    <p
                      onClick={() => navigate(`/products/${sub_category._id}`)}
                    >
                      {sub_category.subCategoryName}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="services">
              <ul>
                <li>Support</li>
                <li>For Business</li>
              </ul>
            </div>
          </div>
          <div className="access_logos">
            <i className="material-symbols-outlined">search</i>
            <i
              onClick={handleCartEntrance}
              className="material-symbols-outlined"
            >
              shopping_cart
            </i>
            <i
              className="material-symbols-outlined user_icon"
              onMouseEnter={handleUserMenu}
            >
              person
            </i>
            {userBoolean ? (
              <div className="user_menu" onMouseLeave={handleUserMenuOnLeave}>
                <span onClick={() => navigate("/login")}>Login/Signup</span>
                <span onClick={() => dispatch(userLogout)}>Logout</span>
                <span onClick={handleOrdersEntrance}>Orders</span>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
