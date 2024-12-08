import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const registerAuthor = createAsyncThunk(
  'newAuthor',
  async (authorData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(`${BASE_URL}/authors/register`, authorData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const editAuthor = createAsyncThunk(
  'editAuthor',
  async ({id, ...authorData}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(`${BASE_URL}/authors/updateByID/${id}`, authorData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteAuthor = createAsyncThunk(
  'deleteAuthor',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.delete(`${BASE_URL}/authors/delete/${id}`, config);
      return response.data;
      } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)