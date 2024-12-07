import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const reactionsDelete = createAsyncThunk("reactionsDelete", async({dataDelete}) => {
       
        console.log("Se entro a la solicitud");
        const {id} = dataDelete
        
            const response = await axios.delete(`https://grupo6backminga.onrender.com/api/reactions/${id}`)
        console.log("Response",response.data);
       
        return response.data.response
        })