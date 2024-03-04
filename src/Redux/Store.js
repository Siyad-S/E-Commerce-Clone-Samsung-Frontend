import { configureStore } from "@reduxjs/toolkit";
import HomePageSliceReducer from "./Slices/HomePageSlice";
import AdminSlice from "./Slices/AdminSlice";

export const store = configureStore({
    reducer: {
        homeSlice: HomePageSliceReducer,
        adminSlice: AdminSlice
    }
})