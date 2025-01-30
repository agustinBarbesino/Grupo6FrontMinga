import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://grupo6backminga.onrender.com/api';

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

export const editCompany = createAsyncThunk(
  'editCompany',
  async ({ id, ...companyData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.put(`${BASE_URL}/companies/update/${id}`, companyData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteCompany = createAsyncThunk(
  'deleteCompany',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.delete(`${BASE_URL}/companies/delete/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)