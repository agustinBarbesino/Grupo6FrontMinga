import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const Categories = createAsyncThunk("GetCategories", async() => {
       
        console.log("Se entro a la solicitud");
        
            const response = await axios.get("https://grupo6backminga.onrender.com/api/categories/all")
        console.log("Response",response.data);
       
        return response.data.response
        })