import { createReducer } from "@reduxjs/toolkit"
import {getCompanies, getAuthor, updateActiveCompanies, updateActiveAuthors} from "../actions/panelActions.js"

const initialState = {
    loadingCompanies: false,
    loadingAuthor: false,
    loading: false,
    companies: [],
    authors: [],
    active:'',

}

export const panelReducer = createReducer (initialState,(builder)=> {
    builder
    .addCase(getCompanies.pending, (state)=>{
        state.loadingCompanies = true
    })
    .addCase(getCompanies.fulfilled, (state, action)=>{
        console.log('Reducer received data:', action.payload);
        state.loadingCompanies = false
        state.companies = action.payload
    })
    .addCase(getCompanies.rejected, (state)=>{
        state.loadingCompanies = false
        state.error = true
    })
    .addCase(getAuthor.pending, (state)=>{
        state.loadingAuthor=true
    })
    .addCase(getAuthor.fulfilled, (state, action)=>{
        console.log('Reducer received data:', action.payload);
        state.loadingAuthor = false
        state.authors = action.payload
    })
    .addCase(getAuthor.rejected, (state)=>{
        state.loadingAuthor = false
        state.error = true
    })
    .addCase(updateActiveCompanies.pending, (state)=>{
        state.loading=true
    })
    .addCase(updateActiveCompanies.fulfilled, (state, action)=>{
        state.loading = false
        state.active = action.payload
    })
    .addCase(updateActiveCompanies.rejected, (state)=>{
        state.loading = false
        state.error = true
    })
    .addCase(updateActiveAuthors.pending, (state)=>{
        state.loading=true
    })
    .addCase(updateActiveAuthors.fulfilled, (state, action)=>{
        state.loading = false
        state.active = action.payload
    })
    .addCase(updateActiveAuthors.rejected, (state)=>{
        state.loading = false
        state.error = true
    })
})