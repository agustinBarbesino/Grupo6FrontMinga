import { createReducer } from '@reduxjs/toolkit'
import { createManga, createChapter, setShowSendModal } from '../actions/newActions.js'

const initialState = {
    categories: [],
    loading: false,
    error: null,
    showSendModal: false,
    mangaData: null,
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
      });
})