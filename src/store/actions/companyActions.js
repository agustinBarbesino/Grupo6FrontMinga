import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const registerCompany = createAsyncThunk(
  'newCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(`${BASE_URL}/companies/register`, companyData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)