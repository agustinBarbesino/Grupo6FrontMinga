import { createReducer } from "@reduxjs/toolkit";
import { authorRegister } from "../actions/authorActions"

const initialState = {
    status: idle,
    error: null,
    data: null
}

const authorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase (authorRegister.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (authorRegister.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase (authorRegister.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
})

export default authorReducer