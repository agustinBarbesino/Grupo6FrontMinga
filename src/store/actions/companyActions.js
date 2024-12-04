import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerCompany = createAsyncThunk(
  'newCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/companies/register', companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)