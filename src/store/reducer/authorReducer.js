import { createReducer } from "@reduxjs/toolkit";
import { registerAuthor, editAuthor, deleteAuthor } from "../actions/authorActions"

const initialState = {
    status: 'idle',
    error: null,
    data: null
}

const authorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase (registerAuthor.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (registerAuthor.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase (registerAuthor.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase (editAuthor.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (editAuthor.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
            localStorage.removeItem('profile')
        })
        .addCase (editAuthor.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase (deleteAuthor.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (deleteAuthor.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase (deleteAuthor.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
})

export default authorReducer