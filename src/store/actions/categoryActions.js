import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://grupo6backminga.onrender.com/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching categories...');

      const response = await fetch(`${BASE_URL}/categories/all`);
      console.log('Response status:', response.status);

      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      console.log('Categories data:', data);
      return data.response || [];

    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const selectCategories = state => state.categories.categories;
export const selectCategoriesLoading = state => state.categories.loading;
export const selectCategoriesError = state => state.categories.error;