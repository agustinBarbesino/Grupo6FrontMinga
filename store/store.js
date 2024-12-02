import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./reducer/categoryReducer";
import mangasReducer from "./reducer/mangasReducer";
import mangasFilterReducer from "./mangaSlice";


const store = configureStore({
    reducer: {
        mangasFilterStore:mangasFilterReducer,
        categoryStore:categoryReducer,
        mangasStore:mangasReducer
    },
});



export default store