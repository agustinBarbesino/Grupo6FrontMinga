import { createReducer } from '@reduxjs/toolkit';
import { setRole } from '../actions/roleActions';

const initialState = {
    role: 0
}

const roleReducer = createReducer(initialState, (builder) => {
    builder.addCase(setRole, (state, action) => {
        state.selectedRole = action.payload;
    });
});

export default roleReducer