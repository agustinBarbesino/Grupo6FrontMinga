import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
/* const BASE_URL = 'https://grupo6backminga.onrender.com/api'  */
const BASE_URL = 'http://localhost:8080/api'

export const editManga = createAsyncThunk('editManga', async ({ formData }) => {
    const { data, edit, title } = formData
    let variable = data === 'cover Photo' ? 'cover_photo' : data === 'category' ? 'category_id':data
    const modify = { [variable]: edit }
    console.log("modify", modify)
    const response = await axios.put(`${BASE_URL}/mangas/updateOne/${title}`, modify)
    return response.data
}
)

export const setShowSaveModal = createAction("setShowSaveModal")
export const setTitle = createAction("setTitle")

export const deleteManga = createAsyncThunk('deleteManga', async ({ title }) => {
    console.log("title que ira a back", title)
    const response = await axios.delete(`${BASE_URL}/mangas/deleteOne`, { data: { title } })
    return response.data
})

export const setShowDeleteModal = createAction("setShowDeleteModal")
export const setShowDeletedModal = createAction("setShowDeletedModal")
export const setShowNoChaptersModal = createAction("setShowNoChaptersModal")
export const changeChapter = createAction("changeChapter")

export const chapterByManga = createAsyncThunk('chapterByManga', async ({ idC }) => {
    const response = await axios.get(`${BASE_URL}/chapter/all?manga_id=${idC}`)
    return response.data.response
})

export const deleteChapter = createAsyncThunk('deleteChapter', async ({ id }) => {
    const response = await axios.delete(`${BASE_URL}/chapter/deleteByID/${id}`)
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

export const getMangaPhoto = createAsyncThunk("getMangaPhoto", async ({title}) => {
    console.log("llega title", title)
    const response = await axios.get(`${BASE_URL}/mangas/all?title=${title}`)
    const photo = response.data.response[0].cover_photo
    console.log(response.data.response,"photo")
    return photo
})

export const getMangaPhotoID = createAsyncThunk("getMangaPhoto", async ({id}) => {
    const response = await axios.get(`${BASE_URL}/mangas/mangaByID/${id}`)
    const photo = response.data.response.cover_photo
    return photo
})

export const getChapterPhoto = createAsyncThunk("getChapterPhoto", async ({id}) => {
    const response = await axios.get(`${BASE_URL}/chapter/chapterByID/${id}`)
    const photo = response.data.response.cover_photo
    return photo
})