import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

export const fetchCategories = createAsyncThunk(
    "fetchCategories", async () => {
        try {
            const response = await axios.get("http://localhost:5001/category");
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const fetchProducts = createAsyncThunk(
    "fetchProducts", async () => {
        try {
            const response = await axios.get("http://localhost:5001/product");
            return response.data;
        } catch(error) {
            console.log(error)
            throw error;
        }
    }
)

export const fetchSingleProduct = createAsyncThunk(
    "fetchSingleProduct", async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/product/${id}`);
            return response.data
        } catch(error) {
            throw error;
        }
    }
)

export const putProductToCart = createAsyncThunk(
    "putProductToCart",
    async ( {user_id, product_Id} ) => {
      try {
        console.log(user_id)
        console.log(product_Id)
        const response = await axios.put(
          `http://localhost:5001/user/cart/${user_id}`,
          {productId: product_Id}
        );
        return response.data.cart;
      } catch (error) {
        console.error('Add to cart failed:', error.response.data.message);
        throw error;
      }
    }
  );

export const removeProductFromCart = createAsyncThunk(
    "removeProductFromCart",
    async ( {index} ) => {
        let userId = localStorage.getItem('user')
        userId = JSON.parse(userId);
        userId = userId._id;
        try {
            const response = await axios.delete(
                `http://localhost:5001/user/cart/${userId}/${index}`
            )
            return response.data
        } catch(error) {
            console.log('Remove from cart has failed: ', error.response.data.message);
        }
    }
)
  

export const getCartProducts = createAsyncThunk(
    "getCartProducts", async ({userId}) => {
        try {
            const response = await axios.get(`http://localhost:5001/user/cart/${userId}`)
            return response.data
        } catch(error) {
            console.error('Get cart failed:', error.response.data.message);
        }
    }
)

export const getSubCategory = createAsyncThunk(
    "getSubCategory", async () => {
        try {
            const response = await axios.get("http://localhost:5001/sub_category")
            return response.data
        } catch(error) {
            throw error
        }
    }
)

export const registerUser = createAsyncThunk(
    "registerUser", async (userData) => {
        try {

            const response = await axios.post('http://localhost:5001/user/register', userData );
            return response.data

        } catch(error) {
            console.error('Login register failed:', error.response.data.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "loginUser", async (userData) => {
        try {
            const response = await axios.post('http://localhost:5001/user/login', userData, {
                withCredentials: true
            });
            console.log(response.data.userId);
            localStorage.setItem("userId", JSON.stringify(response.data.userId))
            return response.data
            
        } catch(error) {
            console.error('Login failed:', error.response.data.message)
        }
    }
)


export const userLogout = createAsyncThunk(
    "userLogout", async (token) => {
        try {
            const response = await axios.post('http://localhost:5001/user/logout', {}, {
                withCredentials: true
            });

            localStorage.removeItem(token)

            console.log("User successfully logged out");

        } catch(error) {

            console.log("Logout failed: ", error.response.data.message);

        }
    }
)

export const placeOrder = createAsyncThunk(
    "placeOrder", async ({cartData, userId, totalPrice}) => {
        console.log(cartData);
        try {
            await axios.post("http://localhost:5001/stripe/create-checkout-session", {cartData, userId, totalPrice})
            .then((res) => {
                if(res.data.url) {
                    window.location.href = res.data.url
                }
            }).catch((err) => console.log(err.message));
            
        } catch (error) {
            console.log(("Order placing failed: ", error.response.data.message));
        }
    }
)

// export const paymentVerify = createAsyncThunk(
//     "paymentVerify", async (orderResponse) => { 
//         try {
//             response = await axios.post("http://localhost:5001/payment/verify", orderResponse)
//         } catch (error) {
//             console.log(("Payment verification failed: ", error.response.data.message));
//         }
//     }
// )

export const findSession = createAsyncThunk(
    "findSession", async ({orderId}) => {
        console.log(orderId)
        try {
            const response = await axios.get(`http://localhost:5001/stripe/order-session/?orderId=${orderId}`);
            console.log(response.data);
            return response.data
        } catch(error) {
            console.log(("Session finding failed: ", error.response.data.message));
        }
    }
)

export const currentOrder = createAsyncThunk(
    "currentOrder", async ({orderId}) => {
        try {
            const response = await axios.get(`http://localhost:5001/order/${orderId}`);
            console.log(response);
            return response.data
        } catch(error) {
            console.log(("Current order getting failed: ", error.message));
        }
    }
)

// export const getAllOrders = createAsyncThunk(
//     "getAllOrders", async () => {
//         try {
//             const response = await axios.get(`http://localhost:5001/order`);
//             console.log(response);
//             return response.data
//         } catch(error) {
//             console.log(("Current order getting failed: ", error.message));
//         }
//     }
// )


const homePageSlice = createSlice({
    name: "homeSlice",
    initialState: {
        isError: false,
        allCategories: [],
        allProducts: [],
        singleProduct: {},
        // productInCart: "",
        allCartProducts: [],
        allSubCategories: [],
        registerFormData: {
            userName: "",
            email: "",
            phone: "",
            password: "",
            cart: [],
        },
        loginFormData: {
            email: "",
            password: ""
        },
        // userData: {},
        order: [],
        // verifiedPayments: []
        paymentDetails: [],
        currentOrders: [],
        // allOrders: []
    },
    reducers: {
        setRegisterUser: (state, action) => {
            state.registerFormData = { ...action.payload }
        },
        setLoginUser: (state, action) => {
            state.loginFormData = { ...action.payload}
        },
        setPutProductToCart: (state, action) => {
            state.registerFormData.cart = {...action.payload}
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.allCategories = action.payload;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            })
            .addCase(putProductToCart.fulfilled, (state, action) => {
                state.registerFormData.cart = action.payload
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.allCartProducts = action.payload
            })
            .addCase(getSubCategory.fulfilled, (state, action) => {
                state.allSubCategories = action.payload
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInformations = action.payload
            })
            // .addCase(loginUser.fulfilled, (state, action) => {
            //     state.userData = action.payload
            // })
            // .addCase(removeProductFromCart.fulfilled, (state, action) => {
            //     state.registerFormData.cart = action.payload
            // })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.order = action.payload
            })
            // .addCase(paymentVerify.fulfilled, (state, action) => {
            //     state.verifiedPayments = action.payload
            // })
            .addCase(findSession.fulfilled, (state, action) => {
                state.paymentDetails = action.payload
            })
            .addCase(currentOrder.fulfilled, (state, action) => {
                state.currentOrders = action.payload
            })
            // .addCase(currentOrder.fulfilled, (state, action) => {
            //     state.allOrders = action.payload
            // })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isError = true;
                console.log("Error on fetchCategories");
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error on fetchProducts");
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error on fetchSingleProduct");
            })
            .addCase(putProductToCart.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error on putProductToCart");
            })
            .addCase(getCartProducts.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error on getCartProducts");
            })
            .addCase(getSubCategory.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error on getSubCategory");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error occured on registerUser");
            })
            // .addCase(loginUser.rejected, (state, action) => {
            //     state.isError = true;
            //     console.error(error)
            //     console.log("Error on userLogout")
            // })
            // .addCase(removeProductFromCart.rejected, (state, action) => {
            //     state.isError = true;
            //     console.error(error)
            //     console.log("Error occured on removeProductFromCart");
            // })
            .addCase(placeOrder.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error occured on placeOrder");
            })
            // .addCase(paymentVerify.rejected, (state, action) => {
            //     state.isError = true;
            //     console.log(error)
            //     console.log("Error occured on paymentVerify");
            // })
            .addCase(findSession.rejected, (state, action) => {
                state.isError = true;
                console.error(error)
                console.log("Error occured on findSession");
            })
            .addCase(currentOrder.rejected, (state, action) => {
                state.isError = true;
                console.error(error.message)
                console.log("Error occured on current order method");
            })
            // .addCase(currentOrder.rejected, (state, action) => {
            //     state.isError = true;
            //     console.error(error.message)
            //     console.log("Error occured on getAllOrders method");
            // })
    },
});

export const {setRegisterUser, setLoginUser} = homePageSlice.actions;

export default homePageSlice.reducer;
