import { createReducer } from '@reduxjs/toolkit';
import { fetchCategories } from '../actions/categoryActions';

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      console.log('Reducer received data:', action.payload);
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.categories = [];
    });
});

export default categoryReducer;