import { createReducer } from '@reduxjs/toolkit'
import { deleteManga, changeChapter, editManga, setShowDeleteModal, setShowDeletedModal, setShowSaveModal, chapterByManga, editChapter, deleteChapter } from '../actions/editActions'

const initialState = {
  categories: [],
  loading: false,
  loadingEdit: false,
  loadingDelete: false,
  error: null,
  showSaveModal: false,
  showDeleteModal: false,
  showDeletedModal: false,
  mangaData: null,
  chaptersTrigger: null,
  chaptersData: null,
  initialFormDataManga: {
    title: '',
    data: '',
    edit: '',
  },
  deleteSuccess: false,
  title: '',
  chapterSelected: [],
  initialFormDataChapter: {
    chapter: '', data: '', order: null, edit: '',
    Pages: [],
  },
  textAreaHeight: 'auto'
}

export const editMangas = createReducer(initialState, (builder) => {
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
      state.loadingEdit = true
    })
    .addCase(editManga.fulfilled, (state, action) => {
      state.loadingEdit = false
      state.mangaData = action.payload
    })
    .addCase(editManga.rejected, (state, action) => {
      state.loadingEdit = false
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
export const editChapters = createReducer(initialState, (builder) => {
  builder.addCase(setShowSaveModal, (state, action) => {
    state.showSaveModal = action.payload
  })
    .addCase(setShowDeleteModal, (state, action) => {
      state.showDeleteModal = action.payload
    })
    .addCase(setShowDeletedModal, (state, action) => {
      state.showDeletedModal = action.payload
    })
    .addCase(chapterByManga.pending, (state) => {
      state.loading = true
    })
    .addCase(chapterByManga.fulfilled, (state, action) => {
      state.loading = false
      state.chaptersData = action.payload
    })
    .addCase(chapterByManga.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    .addCase(changeChapter, (state, action) => {
      state.chapterSelected = action.payload
    })
    .addCase(editChapter.pending, (state) => {
      state.loadingEdit = true
    })
    .addCase(editChapter.fulfilled, (state, action) => {
      state.loadingEdit = false
      state.chaptersTrigger = action.payload
    })
    .addCase(editChapter.rejected, (state, action) => {
      state.loadingEdit = false
      state.error = action.error.message
    })
    .addCase(deleteChapter.pending, (state) => {
      state.loadingDelete = true
    })
    .addCase(deleteChapter.fulfilled, (state, action) => {
      state.loadingDelete = false
      state.deleteSuccess = true
    })
    .addCase(deleteChapter.rejected, (state, action) => {
      state.loadingDelete = false
      state.error = action.payload
    })
})