import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import {chapterReducer} from './reducer/chapterReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    chapterStore: chapterReducer
  },
})

export default store