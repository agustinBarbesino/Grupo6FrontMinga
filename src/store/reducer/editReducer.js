import { createReducer } from '@reduxjs/toolkit'
import { deleteManga, editManga, setShowDeleteModal, setShowDeletedModal, setShowSaveModal } from '../actions/editActions'

const initialState = {
    categories: [],
    loading: false,
    loadingDelete: false,
    error: null,
    showSaveModal: false,
    showDeleteModal: false,
    showDeletedModal: false,
    mangaData: null,
    chapterData: null,
    initialFormData: {
        title: '',
        data: '',
        edit: '',
    },
    deleteSuccess: false,
    title: '',
  }

export const editMangas = createReducer(initialState, (builder)=>{
    builder.addCase(setShowSaveModal, (state, action) => {
        state.showSaveModal = action.payload
      })
      .addCase(setShowDeleteModal, (state, action) => {
        state.showDeleteModal = action.payload
      })
      .addCase(setShowDeletedModal, (state, action) => {
        state.showDeletedModal = action.payload
      })
      .addCase(editManga.pending, (state) => {
        state.loading = true
      })
      .addCase(editManga.fulfilled, (state, action) => {
        state.loading = false
        state.mangaData = action.payload
      })
      .addCase(editManga.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteManga.pending, (state) => {
        state.loadingDelete = true
      })
      .addCase(deleteManga.fulfilled, (state, action) => {
        state.loadingDelete = false
        state.deleteSuccess = true
      })
      .addCase(deleteManga.rejected, (state, action) => {
        state.loadingDelete = false
        state.error = action.payload
      })
})