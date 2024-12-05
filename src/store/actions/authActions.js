import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8080/api';

export const clearError = createAction('auth/clearError');
export const clearSuccess = createAction('auth/clearSuccess');
export const logout = createAction('auth/logout');
export const processGoogleResponse = createAction('auth/processGoogleResponse');

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) throw new Error('Invalid credentials');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin/google`, {
        method: 'GET',
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Google authentication failed');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/user/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return rejectWithValue(data.message || 'Registration failed');
        }
        
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Logout failed');
      await response.json();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Selectors
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUser = state => state.auth.user;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthError = state => state.auth.error;
export const selectAuthSuccess = state => state.auth.success;