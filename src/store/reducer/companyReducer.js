import { createReducer } from '@reduxjs/toolkit';
import { companyRegister } from '../actions/companyActions';

const initialState = {
    status: idle,
    error: null,
    data: null
}

const companyReducer = createReducer(initialState, (builder) => {
    builder
        .addCase (companyRegister.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (companyRegister.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase (companyRegister.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
})

export default companyReducer