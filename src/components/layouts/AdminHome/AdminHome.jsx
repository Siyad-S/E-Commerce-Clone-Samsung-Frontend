import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import AdminHeader from "../../common/AdminHeader/AdminHeader";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../../Redux/Slices/HomePageSlice";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";
import {
  editCategory,
  getSingleCategory,
  addCategory,
  setAddCategoryForm,
  setAddCategoryImage,
} from "../../../Redux/Slices/AdminSlice";
import Modal from "../../common/Modal/Modal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdminHome = () => {
  const [Id, setId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.homeSlice.allCategories.categories
  );
  const singleCategory = useSelector(
    (state) => state.adminSlice.singleCategoryData.singleCategory
  );
  const categoryForm = useSelector((state) => state.adminSlice.categoryAddForm);
  const [openEditCat, setOpenEditCat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [actionName, setActionName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  // const [singleCatData, setSingleCatData] = useState({})

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryItems = useSelector(
    (state) => state.adminSlice.categoryAddForm
  );

  const [openAddCat, setOpenAddCat] = useState(false);

  const handleOpenAddCategory = () => {
    setOpenAddCat(true);
  };

  const handleCloseAddCategory = () => {
    setOpenAddCat(false);
  };

  const categoryPostHandler = (e) => {
    const newCategoryData = {
      ...categoryItems,
      [e.target.id]: e.target.value,
    };
    dispatch(setAddCategoryForm(newCategoryData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(setAddCategoryImage(file));
    updateSingleCatData("category_image", file);
  };

  const postCategory = async (values) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("file", values.category_image);

    try {
      await dispatch(addCategory({ categoryData: formData }));
      setOpenAddCat(false);
      setOpenModal(true);
      setMessage("Add");
    } catch (error) {
      console.log("Failed to add new category", error.message);
    }
  };

  const handleOpenEditCategory = async (id) => {
    await dispatch(getSingleCategory(id));
    await setOpenEditCat(true);
    setId(id);
  };

  const handleCloseEditCategory = () => {
    setOpenEditCat(false);
  };

  const updateSingleCatData = (key, value) => {
    setSingleCatData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // const deleteCatHandler = async (id) => {
  //   await dispatch(deleteCategory(id));
  //   dispatch(fetchCategories());
  // };

  const submitEditedCategory = async (values) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("file", values.category_image);
    try {
      await dispatch(editCategory({ editedData: formData, id: Id }));
      setOpenEditCat(false);
      setOpenModal(true);
      setMessage("Edit");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteModal = async (id) => {
    setActionName("Category");
    setDeleteModal(true);
    setId(id);
  };

  // console.log(singleCategory?.category_image);

  const yupValidationSchema = Yup.object().shape({
    category: Yup.string().required("Category name is required"),
    category_image: Yup.string().required("Category image is required"),
  });

  return (
    <>
      <div className="admin_home">
        <div className="dashboard">
          <AdminDashBoard />
        </div>
        <div className="home">
          {/* <AdminHeader /> */}
          <div className="home_btn">
            <button onClick={handleOpenAddCategory}>Add Category</button>
          </div>
          <div className="categories">
            {categories &&
              categories.map((category, index) => (
                <div className="category_card" key={index}>
                  <div
                    className="image"
                    onClick={() =>
                      navigate(`/admin-subCategory/${category._id}`)
                    }
                  >
                    <img
                      src={`http://localhost:5001/category/uploads/${category.category_image}`}
                      alt=""
                    />
                  </div>
                  <div className="card_content">
                    <h4>{category.category}</h4>
                    <div className="edit_delete">
                      <button
                        onClick={() => handleOpenEditCategory(category._id)}
                      >
                        <i className="material-symbols-outlined">edit</i>
                      </button>
                      <button>
                        <i
                          className="material-symbols-outlined"
                          onClick={() => handleDeleteModal(category._id)}
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
        {/* {openAddCat ? (
          <>
            <div className="category-form-container">
              <button className="close-button" onClick={handleCloseAddCategory}>
                <i className="material-symbols-outlined">close</i>
              </button>
              <form className="add_category_form">
                <h3>Add Category</h3>
                <label htmlFor="category">Category Name:</label>
                <input
                  type="text"
                  id="category"
                  value={categoryItems.category}
                  onChange={categoryPostHandler}
                />

                <label htmlFor="category_image">Category Image:</label>
                <input
                  type="file"
                  id="category_image"
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <button type="button" onClick={postCategory}>
                  Submit
                </button>
              </form>
            </div>
            <div className="overlay"></div>
          </>
        ) : null} */}

        {openAddCat ? (
          <>
            <div className="category-form-container">
              <button className="close-button" onClick={handleCloseAddCategory}>
                <i className="material-symbols-outlined">close</i>
              </button>
              <Formik
                initialValues={{
                  category: "",
                  category_image: null,
                }}
                onSubmit={(values) => {
                  postCategory(values);
                }}
                validationSchema={yupValidationSchema}
              >
                {(formik) => (
                  <form
                    className="add_category_form"
                    onSubmit={formik.handleSubmit}
                  >
                    {console.log(formik)}
                    <h3>Add Category</h3>
                    <label htmlFor="category">Category Name:</label>
                    <Field type="text" name="category" />
                    <ErrorMessage
                      name="category"
                      component="span"
                      className="field_error"
                    />

                    <label htmlFor="category_image">Category Image:</label>
                    <input
                      type="file"
                      id="category_image"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "category_image",
                          event.currentTarget.files[0]
                        );
                      }}
                      accept="image/*"
                    />
                    <ErrorMessage
                      name="category_image"
                      component="span"
                      className="field_error"
                    />

                    <button type="submit">Submit</button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="overlay"></div>
          </>
        ) : null}

        {openModal ? (
          <Modal
            name={"Category"}
            setOpenModal={setOpenModal}
            message={message}
          />
        ) : null}

        {openEditCat ? (
          <>
            <div className="category-form-container">
              <button className="close-button">
                <i
                  className="material-symbols-outlined"
                  onClick={handleCloseEditCategory}
                >
                  close
                </i>
              </button>
              <Formik
                initialValues={{
                  category: singleCategory?.category ?? "",
                  category_image: null,
                }}
                validationSchema={yupValidationSchema}
                onSubmit={(values) => submitEditedCategory(values)}
              >
                {(formik) => (
                  <form
                    className="add_category_form"
                    onSubmit={formik.handleSubmit}
                  >
                    <h3>Edit Category</h3>
                    <label htmlFor="category">Category Name:</label>
                    <Field name="category" type="text" id="category" />

                    <ErrorMessage
                      name="category"
                      component="span"
                      className="field_error"
                    />

                    <label htmlFor="category_image">Category Image:</label>
                    <input
                      type="file"
                      id="category_image"
                      name="category_image"
                      onBlur={formik.handleBlur}
                      onChange={(event) => {
                        formik.setFieldValue(
                          "category_image",
                          event.currentTarget.files[0]
                        );
                      }}
                      accept="image/*"
                    />

                    <ErrorMessage
                      name="category_image"
                      component="span"
                      className="field_error"
                    />

                    <button type="submit">Submit</button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="overlay"></div>
          </>
        ) : null}

        {deleteModal && (
          <DeleteModal
            name={actionName}
            id={Id}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        )}
      </div>
    </>
  );
};

export default AdminHome;
