import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'
import mangasReducer from "./reducer/mangasReducer";
import  mangasFilterReducer from "./mangaSlice";
import chapterReducer from "./reducer/mangaReducer";
import { newChapter, newManga } from './reducer/newReducer'
import { editMangas } from './reducer/editReducer'
import roleReducer from './reducer/roleReducer'
import authorReducer from './reducer/authorReducer'
import companyReducer from './reducer/companyReducer'
import authorsReducer from './reducer/authorsReducer';
import reactionsAllReducer from './reducer/reactionsAllReducer';
import reactionsUpdateReducer from './reducer/reactionsUpdateReducer';
import reactionsDeleteReducer from './reducer/reactionsDeleteReducer';
import reactionsCreateReducer from './reducer/reactionsCreateReducer';


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
    mangasStore:mangasReducer,
    company: companyReducer,
    author: authorReducer,
    authors: authorsReducer,
    reactions:reactionsAllReducer,
    reactionUpdate:reactionsUpdateReducer,
    reactionsDeleteReducer:reactionsDeleteReducer,
    reactionCreate:reactionsCreateReducer


  },
})

export default store