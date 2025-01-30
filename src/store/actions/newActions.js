import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'https://grupo6backminga.onrender.com/api'

export const createManga = createAsyncThunk('createManga', async({formData}) => {
    console.log("manga", formData)
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

export const getMangaPhoto = createAsyncThunk("getMangaPhoto", async ({id}) => {
    const response = await axios.get(`${BASE_URL}/mangas/mangaByID/${id}`)
    const photo = response.data.response.cover_photo
    console.log("photo", photo)
    return photo
})

