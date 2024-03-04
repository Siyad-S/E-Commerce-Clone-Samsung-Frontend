import React from "react";
import "./Modal.css";
import {
  fetchCategories,
  getSubCategory,
  fetchProducts
} from "../../../Redux/Slices/HomePageSlice";
import { useDispatch } from "react-redux";

const Modal = ({ message, setOpenModal, name }) => {
  const dispatch = useDispatch();

  const handleOkBtnClick = () => {
    if (name === "Category") {
      dispatch(fetchCategories());
      setOpenModal(false);
    }
    if (name === "Sub Category") {
      dispatch(getSubCategory());
      setOpenModal(false);
    }
    if (name === "Product") {
      dispatch(fetchProducts());
      setOpenModal(false);
    }
  };
  return (
    <>
      <div className="modal">
        <div className="modal_head">
          <h2>
            {name} {message} Notification
          </h2>
          <button>
            <i className="material-symbols-outlined">close</i>
          </button>
        </div>
        <div className="modal_body">
          <h3>Succesfully {message}ed</h3>
        </div>
        <div className="modal_buttons">
          <button onClick={handleOkBtnClick}>Ok</button>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default Modal;
