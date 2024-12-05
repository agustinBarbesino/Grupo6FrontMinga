import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChapter = createAsyncThunk("GET_CHAPTER", async (id) => {

    const response = await axios.get(`https://grupo6backminga.onrender.com/api/chapter/chapterByID/${id}`)
    console.log(response.data);
    
    return response.data.response;
})