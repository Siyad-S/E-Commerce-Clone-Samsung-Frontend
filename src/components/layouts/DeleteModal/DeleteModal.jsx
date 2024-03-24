import React, { useState } from "react";
import "./deleteModal.css";
import {
  fetchProducts,
  fetchCategories,
  getSubCategory,
} from "../../../Redux/Slices/HomePageSlice";
import {
  deleteProduct,
  deleteCategory,
  deleteSubCategory,
  deleteBanner,
  getBanners,
} from "../../../Redux/Slices/AdminSlice";
import { useDispatch } from "react-redux";

const Modal = ({ name, id, setDeleteModal }) => {
  const dispatch = useDispatch();
  const [openChildModal, setOpenChildModal] = useState(false);
  const [parentModal, setParentModal] = useState(true);

  const refreshFunction = async () => {
    switch (name) {
      case "Category":
        await dispatch(fetchCategories());
        setOpenChildModal(false);
        break;
      case "Sub Category":
        await dispatch(getSubCategory());
        setOpenChildModal(false);
        break;
      case "Product":
        await dispatch(fetchProducts());
        setOpenChildModal(false);
        break;
      case "Banner":
        await dispatch(getBanners());
        setOpenChildModal(false);
        break;
      default:
        console.log("Invalid name:", name);
        break;
    }
  };

  const handleDelete = async () => {
    switch (name) {
      case "Category":
        await dispatch(deleteCategory(id));
        break;
      case "Sub Category":
        await dispatch(deleteSubCategory(id));
        break;
      case "Product":
        dispatch(deleteProduct({ Id: id }));
        break;
      case "Banner":
        dispatch(deleteBanner(id));
        break;
      default:
        console.log("Invalid name:", name);
        break;
    }

    setParentModal(false);
    setOpenChildModal(true);
  };

  const handleParentModal = () => {
    setDeleteModal(false);
  };

  return (
    <>
      {parentModal ? (
        <>
          <div className="modal">
            <div className="modal_head">
              <h2>Delete Confirmation</h2>
              <button>
                <i
                  className="material-symbols-outlined"
                  onClick={handleParentModal}
                >
                  close
                </i>
              </button>
            </div>
            <div className="modal_body">
              <h3>Do you want to delete?</h3>
            </div>
            <div className="modal_buttons">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={handleParentModal}>No</button>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}

      {openChildModal ? (
        <>
          <div className="modal">
            <div className="modal_head">
              <h2>Delete Notification</h2>
              <button>
                <i className="material-symbols-outlined">close</i>
              </button>
            </div>
            <div className="modal_body">
              <h3>The {name} Deleted Successfully</h3>
            </div>
            <div className="modal_buttons">
              <button onClick={() => refreshFunction()}>Ok</button>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
