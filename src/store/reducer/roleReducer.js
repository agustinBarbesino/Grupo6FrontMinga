import { createReducer } from '@reduxjs/toolkit';
import { setRole, updateUserRole } from '../actions/roleActions';

const initialState = {
    role: (() => {
        try {
          return JSON.parse(localStorage.getItem('role')) || 0;
        } catch {
          return null;
        }
      })(),
      user: JSON.parse(localStorage.getItem('user')) || null, 
      loading: false,
      error: null,
}

const roleReducer = createReducer(initialState, (builder) => {
    builder.addCase(setRole, (state, action) => {
        state.role = action.payload;
        localStorage.setItem('role', action.payload);
    })
    .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
    })
    .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

});

export default roleReducer