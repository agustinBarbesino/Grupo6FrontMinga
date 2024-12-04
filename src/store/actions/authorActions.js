import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerAuthor = createAsyncThunk(
  'newAuthor',
  async (authorData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/authors/register', authorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)