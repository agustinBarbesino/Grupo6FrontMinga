import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import categoryReducer from "./reducer/categoryReducer";
import mangasReducer from "./reducer/mangasReducer";
import  mangasFilterReducer from "./mangaSlice";
import chapterReducer from "./reducer/mangaReducer";




const store = configureStore({
    reducer: {
      auth:authReducer,
      categories: categoryReducer,
      chapters:chapterReducer,
        mangasFilterStore:mangasFilterReducer,
        mangasStore:mangasReducer
    },
});



export default store