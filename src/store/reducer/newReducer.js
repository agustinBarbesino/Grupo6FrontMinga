import { createReducer } from '@reduxjs/toolkit'
import { createManga, createChapter, setShowSendModal, getMangaPhoto } from '../actions/newActions.js'

const initialState = {
    categories: [],
    loading: false,
    loadingSend: false,
    error: null,
    showSendModal: false,
    mangaData: null,
    mangaPhoto: null,
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
        state.loadingSend = true
      })
      .addCase(createManga.fulfilled, (state, action) => {
        state.loadingSend = false
        state.mangaData = action.payload
      })
      .addCase(createManga.rejected, (state, action) => {
        state.loadingSend = false
        state.error = action.error.message
      })
      .addCase(getMangaPhoto.pending, (state) => {
        state.loading = true
      })
      .addCase(getMangaPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.mangaPhoto = action.payload
      })
      .addCase(getMangaPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
})

export const newChapter = createReducer(initialState, (builder)=>{
    builder.addCase(setShowSendModal, (state, action) => {
        state.showSendModal = action.payload
      })
      .addCase(createChapter.pending, (state) => {
        state.loadingSend = true
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loadingSend = false
        state.chapterData = action.payload
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loadingSend = false
        state.error = action.error.message
      })
      .addCase(getMangaPhoto.pending, (state) => {
        state.loading = true
      })
      .addCase(getMangaPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.mangaPhoto = action.payload
      })
      .addCase(getMangaPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
})