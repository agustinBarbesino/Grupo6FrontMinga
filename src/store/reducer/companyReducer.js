import { createReducer } from '@reduxjs/toolkit';
import { registerCompany, editCompany, deleteCompany } from '../actions/companyActions';

const initialState = {
    status: 'idle',
    error: null,
    data: null
}

const companyReducer = createReducer(initialState, (builder) => {
    builder
        .addCase (registerCompany.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (registerCompany.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase (registerCompany.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase (editCompany.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (editCompany.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
            localStorage.removeItem('profile')
        })
        .addCase (editCompany.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase (deleteCompany.pending, (state) => {
            state.status = 'loading'
        })
        .addCase (deleteCompany.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase (deleteCompany.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
})

export default companyReducer