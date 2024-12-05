import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'http://localhost:8080/api'

const createManga = createAsyncThunk('createManga', async({updatedFormData}) => {
    const response = await axios.post(`${BASE_URL}/mangas/create`, updatedFormData)
    return response.data
}
)

const createChapter = createAsyncThunk('createChapter', async({updatedFormData}) => {
    const response = await axios.post(`${BASE_URL}/chapter/create`, updatedFormData)
    return response.data
}
)

export {createManga, createChapter}