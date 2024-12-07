import { createReducer } from '@reduxjs/toolkit'
import { createManga, createChapter, setShowSendModal } from '../actions/newActions.js'

const initialState = {
    categories: [],
    loading: false,
    error: null,
    showSendModal: false,
    mangaData: null,
    chapterData: null,
    initialFormDataManga : {
      title: '',
      category_id: '',
      description: '',
      cover_photo: '',
  }
  }

export const newManga = createReducer(initialState, (builder)=>{
    builder.addCase(setShowSendModal, (state, action) => {
        state.showSendModal = action.payload
      })
      .addCase(createManga.pending, (state) => {
        state.loading = true
      })
      .addCase(createManga.fulfilled, (state, action) => {
        state.loading = false
        state.mangaData = action.payload
      })
      .addCase(createManga.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
})

export const newChapter = createReducer(initialState, (builder)=>{
    builder.addCase(setShowSendModal, (state, action) => {
        state.showSendModal = action.payload
      })
      .addCase(createChapter.pending, (state) => {
        state.loading = true
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loading = false
        state.chapterData = action.payload
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      });
})