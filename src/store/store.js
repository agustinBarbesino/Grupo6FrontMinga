import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import categoryReducer from "./reducer/categoryReducer";
import mangasReducer from "./reducer/mangasReducer";
import  mangasFilterReducer from "./mangaSlice";




const store = configureStore({
    reducer: {
      auth:authReducer,
      categories: categoryReducer,
        mangasFilterStore:mangasFilterReducer,
        mangasStore:mangasReducer
    },
});



export default store