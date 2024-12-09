import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setRole = createAction("SET_ROLE")

export const updateUserRole = createAsyncThunk(
    "updateUserRole", 
    async({id, role}, {rejectWithValue}) => {
        try {

            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await axios.put(`http://localhost:8080/api/user/updateRole`, {
                _id: id,
                role: role
            }, config);

            return response.data.response

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    
})
