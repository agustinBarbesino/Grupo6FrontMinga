import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'http://localhost:8080/api'

export const createManga = createAsyncThunk('createManga', async({formData}) => {
    console.log("updatedFormBack", formData)
    const response = await axios.post(`${BASE_URL}/mangas/create`, formData)
    return response.data
}
)
export const setShowSendModal = createAction("setShowSendModal")


export const createChapter = createAsyncThunk('createChapter', async({updatedFormData}) => {
    const response = await axios.post(`${BASE_URL}/chapter/create`, updatedFormData)
    return response.data
}
)

