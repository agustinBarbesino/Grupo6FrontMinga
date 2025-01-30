import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const reactionsCreate= createAsyncThunk("reactionsCreate", async({dataCreate}) => {
       
        console.log("Se crea la reaction");
        console.log(dataCreate);
        
            const response = await axios.post(`https://grupo6backminga.onrender.com/api/reactions/create`,dataCreate)
        console.log("Response",response.data);
       
        return response.data.response
        })