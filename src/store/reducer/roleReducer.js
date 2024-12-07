import { createReducer } from '@reduxjs/toolkit';
import { setRole } from '../actions/roleActions';

const initialState = {
    role: (() => {
        try {
          return JSON.parse(localStorage.getItem('role')) || 0;
        } catch {
          return null;
        }
      })()
}

const roleReducer = createReducer(initialState, (builder) => {
    builder.addCase(setRole, (state, action) => {
        state.role = action.payload;
        localStorage.setItem('role', action.payload);
    });
});

export default roleReducer