import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'http://localhost:8080/api'

export const getCompanies = createAsyncThunk('getCompanies', async({formData}) => {
    const response = await axios.get(`${BASE_URL}/mangas/create`, formData)
    return response.data
}
)