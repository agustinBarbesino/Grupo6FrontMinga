import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./reducer/categoryReducer";
import mangasReducer from "./reducer/mangasReducer";
import  mangasFilterReducer from "./mangaSlice";
import authReducer from "./reducer/authReducer";



const store = configureStore({
    reducer: {
      auth:authReducer,
        mangasFilterStore:mangasFilterReducer,
        categoryStore:categoryReducer,
        mangasStore:mangasReducer
    },
});



export default store