<<<<<<< HEAD
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


=======
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer
  },
})
>>>>>>> 1c27e5e4de8c6be5eb943289070bc9acb0c7f647

export default store