import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
/* const BASE_URL = 'https://grupo6backminga.onrender.com/api'  */
const BASE_URL = 'http://localhost:8080/api'

export const editManga = createAsyncThunk('editManga', async ({ formData }) => {
    const { data, edit, title } = formData
    let variable = data === 'cover Photo' ? 'cover_photo' : data
    const modify = { [variable]: edit }
    const response = await axios.put(`${BASE_URL}/mangas/updateOne/${title}`, modify)
    return response.data
}
)

export const setShowSaveModal = createAction("setShowSaveModal")

export const deleteManga = createAsyncThunk('deleteManga', async ({ title }) => {
    const response = await axios.delete(`${BASE_URL}/mangas/deleteOne`, { data: { title } })
    return response.data
})

export const setShowDeleteModal = createAction("setShowDeleteModal")
export const setShowDeletedModal = createAction("setShowDeletedModal")
export const changeChapter = createAction("changeChapter")

export const chapterByManga = createAsyncThunk('chapterByTitle', async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/chapter/all?manga_id=${id}`)
    return response.data.response
})

export const deleteChapter = createAsyncThunk('deleteChapter', async ({ filteredChapters }) => {
    const { title } = filteredChapters[0]
    const response = await axios.delete(`${BASE_URL}/chapter/deleteOne`, { data: { title } })
    return response.data
})

export const editChapter = createAsyncThunk('editChapters', async ({ filteredChapters, formData }) => {
    const { _id } = filteredChapters[0]
    const { data, edit } = formData
    let variable = data === 'cover Photo' ? 'cover_photo' : data
    const modify = { [variable]: edit }
    const response = await axios.put(`${BASE_URL}/chapter/updateByID/${_id}`, modify)
    return response.data
}
)