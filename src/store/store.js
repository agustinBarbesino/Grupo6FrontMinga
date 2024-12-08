import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import categoryReducer from './reducer/categoryReducer'
import mangasReducer from "./reducer/mangasReducer";
import  mangasFilterReducer from "./mangaSlice";
import chapterReducer from "./reducer/mangaReducer";
import { newChapter, newManga } from './reducer/newReducer'
import { editChapters, editMangas } from './reducer/editReducer'
import roleReducer from './reducer/roleReducer'
import authorReducer from './reducer/authorReducer'
import companyReducer from './reducer/companyReducer'
import {chapterReadReducer} from './reducer/chapterReducer'
import profileReducer from './reducer/profileReducer'
import { panelReducer } from './reducer/panelReducer'
import authorsReducer from './reducer/authorsReducer';
import reactionsAllReducer from './reducer/reactionsAllReducer';
import reactionsCreateReducer from './reducer/reactionsCreateReducer';
import darkModeReducer from './reducer/darkModeReducer';



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
    editChapters: editChapters,
    chapterStore: chapterReadReducer,
    profile: profileReducer, 
    panelReducer: panelReducer,
    authors: authorsReducer,
    reactions:reactionsAllReducer,
    reactionCreate:reactionsCreateReducer,
    darkMode: darkModeReducer
  },
})

export default store