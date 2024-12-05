import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'
import { newManga } from './reducer/newReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    newManga: newManga
  },
})

export default store