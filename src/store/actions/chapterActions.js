import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChapter = createAsyncThunk("GET_CHAPTER", async (id) => {

    const response = await axios.get(`https://grupo6backminga.onrender.com/api/chapter/chapterByID/${id}`)
    
    return response.data.response;
})

export const getComments = createAsyncThunk("GET_COMMENTS", async (id) => {

    const response = await axios.get(`http://localhost:8080/api/comments/comentschapter/${id}`)

    return response.data.response
})