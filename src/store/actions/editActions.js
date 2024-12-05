import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const BASE_URL = 'http://localhost:8080/api'

const editManga = createAsyncThunk('editManga', async({formData}) => {
    const { data, edit, title } = formData
    const modify= { [data]: edit }
    const response = await axios.post(`${BASE_URL}/mangas/updateOne/${title}`, modify)
    return response.data
}
)

export {editManga}