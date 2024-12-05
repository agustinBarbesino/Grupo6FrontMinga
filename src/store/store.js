import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'
import mangasReducer from "./reducer/mangasReducer";
import  mangasFilterReducer from "./mangaSlice";
import chapterReducer from "./reducer/mangaReducer";
import { newChapter, newManga } from './reducer/newReducer'
import { editMangas } from './reducer/editReducer'
import roleReducer from './reducer/roleReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    categories: categoryReducer,
    newManga: newManga,
    newChapter: newChapter,
    editMangas: editMangas,
    chapters:chapterReducer,
    mangasFilterStore:mangasFilterReducer,
    mangasStore:mangasReducer
    
  },
})

export default store