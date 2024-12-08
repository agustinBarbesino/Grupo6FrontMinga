import { createReducer } from '@reduxjs/toolkit';
import { fetchAuthorData, fetchCompanyData } from '../actions/profileActions';

const initialState = {
  profile: null,
  mangas: [],
  loading: false,
  error: null,
  profileType: null
};

const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAuthorData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAuthorData.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
      state.mangas = action.payload.mangas;
      state.profileType = 'author';
      localStorage.setItem('profile', JSON.stringify(action.payload.profile));
    })
    .addCase(fetchAuthorData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchCompanyData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCompanyData.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
      state.mangas = action.payload.mangas;
      state.profileType = 'company';
      localStorage.setItem('profile', JSON.stringify(action.payload.profile));
    })
    .addCase(fetchCompanyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default profileReducer;