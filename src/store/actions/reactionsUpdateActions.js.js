import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setSearch = createAction("SET_SEARCH")
export const setCategory = createAction("SET_CATEGORY")

export const MangasFetch = createAsyncThunk("GetMangas", async() => {
       
        console.log("Se entro a la solicitud");
        
            const response = await axios.get("http://localhost:8080/api/reactions/update/:id")
        console.log("Response",response.data);
       
        return response.data.response
        })