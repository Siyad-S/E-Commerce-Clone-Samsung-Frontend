import React, { useEffect, useState } from "react";
import "./Banners.css";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";
import {
  postBanner,
  getBanners,
  getBanner,
  updateBanner,
} from "../../../Redux/Slices/AdminSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../DeleteModal/DeleteModal";
import Modal from "../../common/Modal/Modal"

const Banner = () => {
  const [openBannerForm, setOpenBannerForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [actionName, setActionName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const allBanners =
    useSelector((state) => state.adminSlice.banners.bannerData) || [];
  const banner = useSelector((state) => state.adminSlice.banner.bannerData);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleOpenAddBanner = () => {
    setOpenBannerForm(true);
  };

  console.log(allBanners);

  const addBannerHandler = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("description", values?.description);
    formData.append("file", values?.image);

    console.log(formData);
    try {
      await dispatch(postBanner({ bannerData: formData }));
      await setOpenBannerForm(false)
      setOpenModal(true)
      setMessage("Add")
    } catch (error) {
      console.log("Failed to add new banner");
    }
  };

  const editBannerHandler = async (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("description", values?.description);
    formData.append("file", values?.image);

    console.log(formData);

    try {
      dispatch(updateBanner({ id: selectedBanner, bannerData: formData }));
      await setOpenBannerForm(false)
      setOpenModal(true)
      setMessage("Edit")
    } catch (error) {
      console.log("Failed to edit banner");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    onSubmit: (values) => {
      if (selectedBanner === "") {
        addBannerHandler(values);
      } else {
        editBannerHandler(values);
      }
    },
  });

  useEffect(() => {
    if (banner !== undefined || banner !== "") {
      formik.setValues({
        title: banner?.title,
        description: banner?.description,
        image: banner?.image,
      });
    }
  }, [banner]);

  const handleCloseBannerForm = () => {
    setOpenBannerForm(false);
  };

  const handleBannerEdit = (bannerId) => {
    dispatch(getBanner({ id: bannerId }));
    setOpenBannerForm(true);
    setSelectedBanner(bannerId);
  };

  const handleDelete = (bannerId) => {
    setActionName("Banner");
    setDeleteModal(true);
    setSelectedBanner(bannerId);
  };

  return (
    <div className="admin_banner">
      <div className="dashboard">
        <AdminDashBoard />
      </div>
      <div className="home">
        <div className="home_btn">
          <button onClick={handleOpenAddBanner}>Add Banner</button>
        </div>
        <div className="banners">
          {allBanners?.map((banner, index) => (
            <div className="banner" key={index}>
              <div className="edit_delete_btns">
                <i
                  className="material-symbols-outlined"
                  onClick={() => handleBannerEdit(banner._id)}
                >
                  edit
                </i>
                <i
                  className="material-symbols-outlined"
                  onClick={() => handleDelete(banner._id)}
                >
                  delete
                </i>
              </div>
              <div className="banner_image">
                <img
                  src={`http://localhost:5001/banner/uploads/${banner.image}`}
                  alt=""
                />
              </div>
              <div className="banner_content">
                <h1>{banner.title}</h1>
                <h5>{banner.description}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openBannerForm ? (
        <>
          <div className="category-form-container">
            <div className="close_btn_div">
              <button className="close-button" onClick={handleCloseBannerForm}>
                <i className="material-symbols-outlined">close</i>
              </button>
            </div>
            <form className="add_banner_form" onSubmit={formik.handleSubmit}>
              <h2>Add Banner</h2>
              <label htmlFor="title">Title:</label>
              <input
                name="title"
                type="text"
                id="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />

              {/* <ErrorMessage
              name="title"
              component="span"
              className="field_error"
            /> */}

              <label htmlFor="description">Description:</label>
              <input
                name="description"
                type="text"
                id="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />

              {/* <ErrorMessage
              name="description"
              component="span"
              className="field_error"
            /> */}

              <label htmlFor="image">Banner Image:</label>
              <div className="image_preview">
                {formik.values.image && (
                  <img
                    src={
                      formik.values.imagePreview ||
                      `http://localhost:5001/banner/uploads/${formik.values.image}`
                    }
                    alt="Banner preview"
                  />
                )}
              </div>
              <input
                type="file"
                id="image"
                name="image"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                  formik.setFieldValue(
                    "imagePreview",
                    URL.createObjectURL(event.currentTarget.files[0])
                  );
                }}
                accept="image/*"
              />

              {/* <ErrorMessage
              name="image"
              component="span"
              className="field_error"
            /> */}

              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="overlay"></div>
        </>
      ) : null}

      {deleteModal ? (
        <DeleteModal
          name={actionName}
          id={selectedBanner}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      ) : null}

      {openModal ? (
        <Modal name={"Banner"} setOpenModal={setOpenModal} message={message} />
      ) : null}
    </div>
  );
};

export default Banner;
