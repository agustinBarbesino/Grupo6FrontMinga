import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer
  },
})

export default store