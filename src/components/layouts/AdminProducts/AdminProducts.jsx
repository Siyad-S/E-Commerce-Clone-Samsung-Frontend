import React, { useEffect, useState } from "react";
import "./AdminProducts.css";
import { useParams } from "react-router-dom";
import {
  fetchProducts,
  getSubCategory,
  fetchCategories,
} from "../../../Redux/Slices/HomePageSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";
import AdminHeader from "../../common/AdminHeader/AdminHeader";
import {
  setAddProductForm,
  setProductImages,
  setProductCat,
  postProduct,
  setEditProductCat,
  setEditProductForm,
  setEditProductImages,
  editProduct,
  deleteProduct,
} from "../../../Redux/Slices/AdminSlice";
import Modal from "../../common/Modal/Modal";
import DeleteModal from "../../layouts/DeleteModal/DeleteModal"

const AdminProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state.homeSlice.allProducts.allProducts
  );
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setEditOpenForm] = useState(false);
  const [productsBySubCat, setProductsBySubCat] = useState([]);
  const [ProductIdToEdit, setProductIdToEdit] = useState(false);
  const productForm = useSelector((state) => state.adminSlice.productForm);
  const categories = useSelector(
    (state) => state.homeSlice.allCategories.categories
  );
  const subCategories = useSelector(
    (state) => state.homeSlice.allSubCategories.subCategories
  );
  const [selectedCatId, setSelectedCatId] = useState("");
  const [selectedEditCatId, setSelectedEditCatId] = useState("");
  const [subCategoriesCat, setSubCategoriesCat] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [actionName, setActionName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false)
  const [Id, setId] = useState("")

  console.log(id);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getSubCategory());
  }, []);

  const handleOpenAddProduct = () => {
    setOpenForm(true);
  };
  const handleCloseAddProduct = () => {
    setOpenForm(false);
  };

  const handleProductInput = (e) => {
    const product = {
      ...productForm,
      [e.target.id]: e.target.value,
    };
    dispatch(setAddProductForm(product));
  };

  const handleCatOptionInput = (e) => {
    const category = e.target.value;
    dispatch(setProductCat(category));
    const product = {
      ...productForm,
      category_id: category,
    };
    setSelectedCatId(category);
    dispatch(setAddProductForm(product));
  };

  const handleProductImages = (e) => {
    const files = e.target.files;
    dispatch(setProductImages(files));
    const product = {
      ...productForm,
      product_images: files,
    };
    dispatch(setAddProductForm(product));
  };

  console.log(categories);
  console.log(subCategories);

  // const subCatOfCategory = () => {
  //   if (subCategories) {
  //     const filteredSubCategories = subCategories.filter(
  //       (subCat) => subCat.mainCategoryId === selectedCatId
  //     );
  //     setSubCategoriesCat(filteredSubCategories);
  //   }
  // };

  const subCatOfCategory = () => {
    if (subCategories) {
      const filteredSubCategory = subCategories?.filter(
        (subCat) => subCat._id === id
      );
      setSelectedSubCategory(filteredSubCategory);
    }
  };

  const categoryOfSubCat = () => {
    if (categories) {
      const filteredCategory = categories?.filter(
        (category) => category._id === selectedSubCategory?.[0]?.mainCategoryId
      );
      setSelectedCategory(filteredCategory);
    }
  };

  console.log(categories);

  useEffect(() => {
    categoryOfSubCat();
  }, [selectedSubCategory, categories]);

  console.log(selectedSubCategory?.[0]);

  useEffect(() => {
    subCatOfCategory();
  }, [selectedCatId, subCategories]);

  console.log(subCategoriesCat);
  console.log(selectedCatId);

  const submitProduct = async () => {
    const formData = new FormData();
    formData.append("product_name", productForm.product_name);
    formData.append("category_id", selectedSubCategory?.[0]?.mainCategoryId);
    formData.append("sub_category_id", selectedSubCategory?.[0]?._id);
    formData.append("price", productForm.price);
    formData.append("discount", productForm.discount);
    formData.append("description", productForm.description);
    for (const iterator of productForm.product_images) {
      formData.append("files", iterator);
    }

    try {
      await dispatch(postProduct(formData));
      await setOpenForm(false);
      setOpenModal(true);
      setMessage("Add");
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOpenEditProduct = (id) => {
    setProductIdToEdit(id);
    setEditOpenForm(true);
  };

  const handleCloseEditProduct = () => {
    setEditOpenForm(false);
  };

  const handleEditProductInput = (e) => {
    const product = {
      ...productForm,
      [e.target.id]: e.target.value,
    };
    dispatch(setEditProductForm(product));
  };

  const handleEditCatOptionInput = (e) => {
    const category = e.target.value;
    dispatch(setEditProductCat(category));
    const product = {
      ...productForm,
      category_id: category,
    };
    setSelectedEditCatId(category);
    dispatch(setEditProductForm(product));
  };

  const handleEditProductImages = (e) => {
    const files = e.target.files;
    dispatch(setEditProductImages(files));
    const product = {
      ...productForm,
      product_images: files,
    };
    dispatch(setEditProductForm(product));
  };

  const editSubCatOfCategory = () => {
    if (subCategories) {
      const filteredSubCategories = subCategories.filter(
        (subCat) => subCat.mainCategoryId === selectedEditCatId
      );
      setSubCategoriesCat(filteredSubCategories);
    }
  };

  useEffect(() => {
    editSubCatOfCategory();
  }, [selectedEditCatId, subCategories]);

  const submitEditProduct = async () => {
    const formData = new FormData();
    formData.append("product_name", productForm.product_name);
    formData.append("category_id", selectedSubCategory?.[0]?.mainCategoryId);
    formData.append("sub_category_id", selectedSubCategory?.[0]?._id);
    formData.append("price", productForm.price);
    formData.append("discount", productForm.discount);
    formData.append("description", productForm.description);
    for (const iterator of productForm.product_images) {
      formData.append("files", iterator);
    }

    try {
      await dispatch(
        editProduct({ productData: formData, id: ProductIdToEdit })
      );
      await setEditOpenForm(false);
      setOpenModal(true);
      setMessage("Edit");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(selectedCategory);

  const handleDeleteModal = (id) => {
    setActionName("Product")
    setDeleteModal(true)
    setId(id)
  }

  return (
    <>
      {/* <AdminHeader /> */}
      <div className="adminProduct_page">
        <div className="dashboard">
          <AdminDashBoard />
        </div>
        <div className="product_shower">
          <div className="add_btn">
            <button onClick={handleOpenAddProduct}>Add product</button>
          </div>
          <div className="products">
            {productsBySubCat?.map((product, index) => (
              <div className="product_card" key={index}>
                <div className="add_wishlist">
                  {/* <i className="material-symbols-outlined">favorite </i> */}
                </div>
                <div className="image">
                  <img
                    src={`http://localhost:5001/product/uploads/${product.product_image}`}
                    alt=""
                  />
                </div>
                <div className="card_content">
                  <div className="name_price">
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
                        save <i>&#8377;</i>
                        {product.discount}
                      </h5>
                    </div>
                  </div>
                  <div className="edit_delete">
                    <button onClick={() => handleOpenEditProduct(product._id)}>
                      <i className="material-symbols-outlined">edit</i>
                    </button>
                    <button>
                      <i
                        className="material-symbols-outlined"
                        onClick={() => handleDeleteModal(product._id)}
                      >
                        delete
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {openForm ? (
            <>
              <div className="category-form-container">
                <button
                  className="close-button"
                  onClick={handleCloseAddProduct}
                >
                  <i className="material-symbols-outlined">close</i>
                </button>
                <form className="add_category_form">
                  <h3>Add Product</h3>
                  <label htmlFor="product_name">Product Name:</label>
                  <input
                    type="text"
                    id="product_name"
                    value={productForm.product_name}
                    onChange={handleProductInput}
                  />

                  <label htmlFor="mainCategoryId">Category Name:</label>
                  <select
                    type="text"
                    id="category_id"
                    onChange={handleCatOptionInput}
                  >
                    <option>{selectedCategory?.[0]?.category}</option>
                  </select>

                  <label htmlFor="sub_category_id">Sub Category Name:</label>
                  <select
                    type="text"
                    id="sub_category_id"
                    onChange={handleProductInput}
                  >
                    <option>{selectedSubCategory?.[0]?.subCategoryName}</option>
                  </select>

                  <label htmlFor="mainCategoryId">Price:</label>
                  <input
                    type="text"
                    id="price"
                    onChange={handleProductInput}
                    value={productForm.price}
                  />

                  <label htmlFor="mainCategoryId">Discount:</label>
                  <input
                    type="text"
                    id="discount"
                    onChange={handleProductInput}
                    value={productForm.discount}
                  />

                  <label htmlFor="mainCategoryId">Description:</label>
                  <input
                    type="text"
                    id="description"
                    onChange={handleProductInput}
                    value={productForm.description}
                  />

                  <label htmlFor="subCategory_image">Product Images:</label>
                  <input
                    type="file"
                    id="product_images"
                    onChange={handleProductImages}
                    accept="image/*"
                    multiple
                  />

                  <button type="button" onClick={submitProduct}>
                    Submit
                  </button>
                </form>
              </div>
              <div className="overlay"></div>
            </>
          ) : null}

          {openModal ? (
            <Modal
              name={"Product"}
              setOpenModal={setOpenModal}
              message={message}
            />
          ) : null}

          {openEditForm ? (
            <>
              <div className="category-form-container">
                <button
                  className="close-button"
                  onClick={handleCloseEditProduct}
                >
                  <i className="material-symbols-outlined">close</i>
                </button>
                <form className="add_category_form">
                  <h3>Edit Product</h3>
                  <label htmlFor="product_name">Product Name:</label>
                  <input
                    type="text"
                    id="product_name"
                    value={productForm.product_name}
                    onChange={handleEditProductInput}
                  />

                  <label htmlFor="mainCategoryId">Category Name:</label>
                  <select
                    type="text"
                    id="category_id"
                    onChange={handleEditCatOptionInput}
                  >
                    <option>{selectedCategory?.[0]?.category}</option>
                  </select>

                  <label htmlFor="sub_category_id">Sub Category Name:</label>
                  <select
                    type="text"
                    id="sub_category_id"
                    onChange={handleEditProductInput}
                  >
                    <option>{selectedSubCategory?.[0]?.subCategoryName}</option>
                  </select>

                  <label htmlFor="mainCategoryId">Price:</label>
                  <input
                    type="text"
                    id="price"
                    onChange={handleEditProductInput}
                    value={productForm.price}
                  />

                  <label htmlFor="mainCategoryId">Discount:</label>
                  <input
                    type="text"
                    id="discount"
                    onChange={handleEditProductInput}
                    value={productForm.discount}
                  />

                  <label htmlFor="mainCategoryId">Description:</label>
                  <input
                    type="text"
                    id="description"
                    onChange={handleEditProductInput}
                    value={productForm.description}
                  />

                  <label htmlFor="subCategory_image">Product Images:</label>
                  <input
                    type="file"
                    id="product_images"
                    onChange={handleEditProductImages}
                    accept="image/*"
                    multiple
                  />

                  <button type="button" onClick={submitEditProduct}>
                    Submit
                  </button>
                </form>
              </div>
              <div className="overlay"></div>
            </>
          ) : null}
        </div>
        {deleteModal?<DeleteModal name={actionName} id={Id} deleteModal={deleteModal} setDeleteModal={setDeleteModal} /> : null}
      </div>
    </>
  );
};

export default AdminProducts;
