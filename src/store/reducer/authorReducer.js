import { createReducer } from "@reduxjs/toolkit";
import { registerAuthor } from "../actions/authorActions"

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
})

export default authorReducer