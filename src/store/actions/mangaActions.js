import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ChapterFetch = createAsyncThunk("GetChapters", async() => {
       
        console.log("Se entro a la solicitud de capitulos");
        
            const response = await axios.get("https://grupo6backminga.onrender.com/api/chapter/all")
        console.log("Response",response.data);
       
        return response.data.response
        })