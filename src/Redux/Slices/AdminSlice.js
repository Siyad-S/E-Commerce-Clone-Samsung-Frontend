import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk("adminLogin", async (adminData) => {
  try {
    const response = await axios.post("http://localhost:5001/admin/login", {
      adminData,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Admin login has failed", error.response.data.message);
  }
});

export const addCategory = createAsyncThunk(
  "addCategory",
  async ({ categoryData }) => {
    console.log("data in slice:", categoryData);

    try {
      const response = await axios.post(
        "http://localhost:5001/category",
        categoryData
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error occured on add category data",
        error.response.data.message
      );
    }
  }
);
export const editCategory = createAsyncThunk(
  "editCategory",
  async ({ id, editedData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/category/${id}`,
        editedData
      );
      return response.data;
    } catch (error) {
      console.log("Error on editCategory method", error.message);
    }
  }
);

export const getSingleCategory = createAsyncThunk(
  "getSingleCategory",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/category/${id}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error on getSingleCategory method", error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5001/category/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const addSubCategory = createAsyncThunk(
    "addSubCategory", async ({subCatData}) => {
      try {
        const response = await axios.post(`http://localhost:5001/sub_category`, subCatData )
        console.log(response.data);
        return response.data
      } catch (error) {
        console.log(error.message)
      }
    }
)

export const editSubCategory = createAsyncThunk(
  "editSubCategory", async ({id, subCatData}) => {
    try {
      const response = await axios.put(`http://localhost:5001/sub_category/${id}`, subCatData )
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const getSingleSubCategory = createAsyncThunk(
  "getSingleSubCategory",
  async ({Id}) => {
    try {
      const response = await axios.get(`http://localhost:5001/sub_category/${Id}`);
      return response.data;
    } catch (error) {
      console.log( error.response );
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory",
  async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/sub_category/${id}`);
      return response.data;
    } catch (error) {
      console.log( error.response );
    }   
  }
)

export const postProduct = createAsyncThunk(
  "postProduct", async (productData) => {
    try {
      const response = await axios.post('http://localhost:5001/product', productData);
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const editProduct = createAsyncThunk(
  "editProduct", async ({productData, id}) => {
    try {
      const response = await axios.put(`http://localhost:5001/product/${id}`, productData);
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({Id}) => {
    try {
      const response = await axios.delete(`http://localhost:5001/product/${Id}`);
      return response.data;
    } catch (error) {
      console.log( error.response );
    }   
  }
)

export const getUsers = createAsyncThunk(
  "getUsers", async () => {
    try {
      const response = await axios.get(`http://localhost:5001/user`);
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const getAllOrders = createAsyncThunk(
  "getAllOrders", async () => {
    try {
      const response = await axios.get(`http://localhost:5001/order`);
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const getUser = createAsyncThunk(
  "getUser", async ({Id}) => {
    try {
      const response = await axios.get(`http://localhost:5001/user/${Id}`);
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }
)



const adminPanelSlice = createSlice({
  name: "adminSlice",
  initialState: {
    singleCategoryData: {},
    adminLoginForm: {
      email: "",
      password: "",
    },
    categoryAddForm: {
      category: "",
      category_image: "",
    },
    isError: false,
    subCategoryAddForm: {
      subCategoryName: "",
      mainCategoryId: "",
      subCategory_image: "",
    },
    singleSubCatData: {},
    productForm: {
      product_name: "",
      category_id: "",
      sub_category_id: "",
      price: "",
      discount: "",
      description: "",
      product_images: []
    },
    allUsers: [],
    allOrders: [],
    user : {},
  },
  reducers: {
    setAdminLoginForm: (state, action) => {
      state.adminLoginForm = { ...action.payload };
    },
    setAddCategoryForm: (state, action) => {
      state.categoryAddForm = { ...action.payload };
    },
    setAddCategoryImage: (state, action) => {
      state.categoryAddForm.category_image = action.payload;
    },
    setEditCatForm: (state, action) => {
      state.categoryAddForm = { ...action.payload };
    },
    setEditCatImage: (state, action) => {
      state.categoryAddForm.category_image = action.payload;
    },
    setAddSubCategoryForm: (state, action) => {
      state.subCategoryAddForm = { ...action.payload };
    },
    setSubCatImage: (state, action) => {
      state.subCategoryAddForm.subCategory_image = action.payload;
    },
    setEditSubCatForm: (state, action) => {
      state.subCategoryAddForm = {...action.payload}
    },
    setEditSubCatImage: (state, action) => {
      state.subCategoryAddForm.subCategory_image = action.payload;
    },
    setAddProductForm: (state, action) => {
      state.productForm = {...action.payload}
    },
    setProductImages: (state, action) => {
      state.productForm.product_images = {...action.payload}
    },
    setProductCat: (state, action) => {
      state.productForm.category_id = action.payload
    },
    setEditProductForm: (state, action) => {
      state.productForm = {...action.payload}
    },
    setEditProductImages: (state, action) => {
      state.productForm.product_images = {...action.payload}
    },
    setEditProductCat: (state, action) => {
      state.productForm.category_id = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.singleCategoryData = {...action.payload};
      })
      .addCase(getSingleSubCategory.fulfilled, (state, action) => {
        state.singleSubCatData = {...action.payload};
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.productForm = {...action.payload}
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.productForm = {...action.payload}
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.allUsers = {...action.payload}
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.allOrders = {...action.payload}
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = {...action.payload}
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on single get call of category");
      })
      .addCase(getSingleSubCategory.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on single get call of sub category");
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on posting of product");
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on editting of product");
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on getting of users");
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on getting orders of users");
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        console.error(error);
        console.log("Error occured on getting of single user");
      })
  },
});

export const {
  setAdminLoginForm,
  setAddCategoryForm,
  setAddCategoryImage,
  setEditCatForm,
  setEditCatImage,
  setAddSubCategoryForm,
  setSubCatImage,
  setEditSubCatForm,
  setEditSubCatImage,
  setAddProductForm,
  setProductImages,
  setProductCat,
  setEditProductForm,
  setEditProductImages,
  setEditProductCat
} = adminPanelSlice.actions;

export default adminPanelSlice.reducer;
