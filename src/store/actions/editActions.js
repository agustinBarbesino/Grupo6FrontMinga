import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'http://localhost:8080/api'

export const editManga = createAsyncThunk('editManga', async({formData}) => {
    const { data, edit, title } = formData
    let variable = data === 'cover Photo' ? 'cover_photo' : data
    const modify= { [variable]: edit }
    console.log(modify)
    const response = await axios.put(`${BASE_URL}/mangas/updateOne/${title}`, modify)
    return response.data
}
)

export const setShowSaveModal = createAction("setShowSaveModal")

export const deleteManga = createAsyncThunk('deleteManga', async({title})=>{
    const response = await axios.delete(`${BASE_URL}/mangas/deleteOne`,{data: { title }})
    return response.data
})  

export const setShowDeleteModal = createAction("setShowDeleteModal")
export const setShowDeletedModal = createAction("setShowDeletedModal")

