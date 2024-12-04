import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import roleReducer from './reducer/roleReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer
  },
})

export default store