import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const reactionsUpdate = createAsyncThunk("reactionsUpdate", async({dataUpdate}) => {
       
        console.log("Se entro a la solicitud");
        const {id,reaction} = dataUpdate
        
            const response = await axios.put(`https://grupo6backminga.onrender.com/api/reactions/update/${id}`,reaction)
        console.log("Response",response.data);
       
        return response.data.response
        })