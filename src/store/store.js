import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'
import { newChapter, newManga } from './reducer/newReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    newManga: newManga,
    newChapter: newChapter,
  },
})

export default store