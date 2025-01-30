import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://grupo6backminga.onrender.com/api';

export const fetchAuthorData = createAsyncThunk(
  'profile/fetchAuthorData',
  async (author_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const authorResponse = await fetch(`${BASE_URL}/authors/${author_id}`, {
        headers
      });

      if (!authorResponse.ok) throw new Error('Failed to fetch author profile');
      const authorData = await authorResponse.json();

      const mangasResponse = await fetch(`${BASE_URL}/mangas/all?author_id=${author_id}`, {
        headers
      });

      if (!mangasResponse.ok) throw new Error('Failed to fetch author mangas');
      const mangasData = await mangasResponse.json();

      return {
        profile: authorData.response,
        mangas: mangasData.response || []
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCompanyData = createAsyncThunk(
  'profile/fetchCompanyData',
  async (company_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const companyResponse = await fetch(`${BASE_URL}/companies/${company_id}`, {
        headers
      });

      if (!companyResponse.ok) throw new Error('Failed to fetch company profile');
      const companyData = await companyResponse.json();

      const mangasResponse = await fetch(`${BASE_URL}/mangas/all?company_id=${company_id}`, {
        headers
      });

      if (!mangasResponse.ok) throw new Error('Failed to fetch company mangas');
      const mangasData = await mangasResponse.json();

      return {
        profile: companyData.response,
        mangas: mangasData.response || []
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


