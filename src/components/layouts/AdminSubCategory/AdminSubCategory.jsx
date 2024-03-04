import React, { useEffect, useState } from "react";
import "./AdminSubCategory.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCategory,
  fetchCategories,
} from "../../../Redux/Slices/HomePageSlice";
import { useNavigate, useParams } from "react-router-dom";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";
import AdminHeader from "../../common/AdminHeader/AdminHeader";
import {
  setAddSubCategoryForm,
  addSubCategory,
  setSubCatImage,
  // getSingleSubCategory,
  editSubCategory,
  setEditSubCatForm,
  setEditSubCatImage,
} from "../../../Redux/Slices/AdminSlice";
import Modal from "../../common/Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal"

const AdminSubCategory = () => {
  const dispatch = useDispatch();
  const subCategory = useSelector(
    (state) => state.homeSlice.allSubCategories.subCategories
  );
  const categories = useSelector(
    (state) => state.homeSlice.allCategories.categories
  );
  const [subCategories, setSubCategories] = useState([]);
  const [openSubCatForm, setOpenSubCatForm] = useState(false);
  const [openEditSubCat, setOpenEditSubCat] = useState(false);
  const [Id, setId] = useState("");
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false)
  const [actionName, setActionName] = useState("");


  const { id } = useParams();

  useEffect(() => {
    dispatch(getSubCategory());
  }, []);

  console.log(id);

  useEffect(() => {
    const subCat = [];
    subCategory?.map((sub_cat) => {
      if (sub_cat.mainCategoryId === id) {
        subCat.push(sub_cat);
      }
    });
    setSubCategories(subCat);
  }, [subCategory, id]);

  console.log(subCategories);

  const handleOpenAddSubCat = () => {
    setOpenSubCatForm(true);
    dispatch(fetchCategories());
  };
  const handleCloseAddSubCat = () => {
    setOpenSubCatForm(false);
  };

  const subcatForm = useSelector(
    (state) => state.adminSlice.subCategoryAddForm
  );

  const subCatPostHandler = (e) => {
    const newSubCatData = {
      ...subcatForm,
      [e.target.id]: e.target.value,
    };
    dispatch(setAddSubCategoryForm(newSubCatData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(setSubCatImage(file));
    const newSubCatFileData = {
      ...subcatForm,
      subCategory_image: file,
    };
    dispatch(setAddSubCategoryForm(newSubCatFileData));
  };

  useEffect(() => {
    const selectedCategory = categories?.filter(
      (category) => category._id == id
    );
    setSelectedCat(selectedCategory);
  }, [id, categories]);

  console.log(selectedCat?.[0]?.category);

  console.log(subcatForm.subCategory_image);

  const postSubCategory = async () => {
    const formData = new FormData();
    formData.append("subCategoryName", subcatForm.subCategoryName);
    formData.append("mainCategoryId", selectedCat?.[0]?._id);
    formData.append("file", subcatForm.subCategory_image);

    try {
      await dispatch(addSubCategory({ subCatData: formData }));
      setOpenSubCatForm(false);
      setOpenModal(true);
      setMessage("Add");
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(subcatForm);

  const handleOpenEditSubCat = (id) => {
    setOpenEditSubCat(true);
    dispatch(fetchCategories());
    setId(id);
  };
  const handleCloseEditSubCat = () => {
    setOpenEditSubCat(false);
  };

  const updatedSubCatDataHandler = (e) => {
    const subCatdata = {
      ...subcatForm,
      [e.target.id]: e.target.value,
    };
    dispatch(setEditSubCatForm(subCatdata));
  };

  const updateSubCatFileDataHandler = (e) => {
    const file = e.target.files[0];
    dispatch(setEditSubCatImage(file));
    const updatedData = {
      ...subcatForm,
      subCategory_image: file,
    };
    dispatch(setEditSubCatForm(updatedData));
  };

  const submitEditedSubCat = async () => {
    const formData = new FormData();
    formData.append("subCategoryName", subcatForm.subCategoryName);
    formData.append("mainCategoryId", selectedCat?.[0]?._id);
    formData.append("file", subcatForm.subCategory_image);

    try {
      await dispatch(editSubCategory({ subCatData: formData, id: Id }));
      setOpenEditSubCat(false);
      setOpenModal(true);
      setMessage("Edit");
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigateToProduct = (id) => {
    navigate(`/admin-products/${id}`);
  };


  const handleDeleteModal = (id) => {
    setActionName("Sub Category")
    setDeleteModal(true)
    setId(id)
  }

  return (
    <>
      <div className="adminSub_cat">
        <div className="dashboard">
          <AdminDashBoard />
        </div>
        <div className="sub_categories">
          {/* <AdminHeader /> */}
          <div className="open_subCatForm">
            <button onClick={handleOpenAddSubCat}>Add Subcategory</button>
          </div>
          <div className="sub_categories_cards">
            {subCategories?.map((sub_cat, index) => (
              <div className="sub_cat_card" key={index}>
                <div
                  className="sub_cat_image"
                  onClick={() => navigateToProduct(sub_cat._id)}
                >
                  <img
                    src={`http://localhost:5001/sub_category/uploads/${sub_cat.subCategory_image}`}
                    alt=""
                  />
                </div>
                <div className="card_content">
                  <h4>{sub_cat.subCategoryName}</h4>
                  <div className="edit_delete">
                    <button onClick={() => handleOpenEditSubCat(sub_cat._id)}>
                      <i className="material-symbols-outlined">edit</i>
                    </button>
                    <button>
                      <i
                        className="material-symbols-outlined"
                        onClick={() => handleDeleteModal(sub_cat._id)}
                      >
                        delete
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openSubCatForm ? (
        <>
          <div className="category-form-container">
            <button className="close-button" onClick={handleCloseAddSubCat}>
              <i className="material-symbols-outlined">close</i>
            </button>
            <form className="add_category_form">
              <h3>Add Sub Category</h3>
              <label htmlFor="SubCategoryName">Sub category Name:</label>
              <input
                type="text"
                id="subCategoryName"
                value={subcatForm.SubCategoryName}
                onChange={subCatPostHandler}
              />

              <label htmlFor="mainCategoryId">Category Name:</label>
              <select
                type="text"
                id="mainCategoryId"
                onChange={subCatPostHandler}
                // value={selectedCat?.[0]?._id}
              >
                <option>{selectedCat?.[0]?.category}</option>
              </select>

              <label htmlFor="subCategory_image">Category Image:</label>
              <input
                type="file"
                id="subCategory_image"
                onChange={handleFileChange}
                accept="image/*"
              />

              <button type="button" onClick={postSubCategory}>
                Submit
              </button>
            </form>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}

      {openModal ? (
        <Modal
          name={"Sub Category"}
          setOpenModal={setOpenModal}
          message={message}
        />
      ) : null}

      {/* Edit form */}

      {openEditSubCat ? (
        <>
          <div className="category-form-container">
            <button className="close-button" onClick={handleCloseEditSubCat}>
              <i className="material-symbols-outlined">close</i>
            </button>
            <form className="add_category_form">
              <h3>Edit Sub Category</h3>
              <label htmlFor="SubCategoryName">Sub category Name:</label>
              <input
                type="text"
                id="subCategoryName"
                value={subcatForm.SubCategoryName}
                onChange={updatedSubCatDataHandler}
              />

              <label htmlFor="mainCategoryId">Category Name:</label>
              <select type="text" id="mainCategoryId">
                <option>{selectedCat?.[0]?.category}</option>
              </select>

              <label htmlFor="subCategory_image">Category Image:</label>
              <input
                type="file"
                id="subCategory_image"
                onChange={updateSubCatFileDataHandler}
                accept="image/*"
              />

              <button type="button" onClick={submitEditedSubCat}>
                Submit
              </button>
            </form>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}

      {deleteModal?<DeleteModal name={actionName} id={Id} deleteModal={deleteModal} setDeleteModal={setDeleteModal} /> : null}

    </>
  );
};

export default AdminSubCategory;
