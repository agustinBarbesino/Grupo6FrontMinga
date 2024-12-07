import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'http://localhost:8080/api'
/* const BASE_URL = 'https://grupo6backminga.onrender.com/api'  */

export const getCompanies = createAsyncThunk('getCompanies', async() => {
    const response = await axios.get(`${BASE_URL}/companies/all`)
    return response.data.response
}
)
export const getAuthor = createAsyncThunk('getAuthors', async() => {
    const response = await axios.get(`${BASE_URL}/authors/all`)
    return response.data.response
}
)

export const updateActiveCompanies = createAsyncThunk('updateActiveCompanies', async({id, active}) => {
    const response = await axios.put(`${BASE_URL}/companies/update/${id}`,{active:!active})
    return response.data
}) 

export const updateActiveAuthors = createAsyncThunk('updateActiveAuthors', async({id, active}) => {
    console.log("recibe back", id, active, !active)
    const response = await axios.put(`${BASE_URL}/authors/updateByID/${id}`,{active:!active})
    return response.data
}) 