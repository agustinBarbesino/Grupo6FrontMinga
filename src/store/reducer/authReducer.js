import { createReducer } from '@reduxjs/toolkit';
import {clearError, clearSuccess, logout, processGoogleResponse, signIn, signInWithGoogle, signUp, signOut} from '../actions/authActions';

const initialState = {
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  })(),
  loading: false,
  error: null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  success: null
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(clearSuccess, (state) => {
      state.success = null;
    })
    .addCase(logout, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = null;
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
    })
    .addCase(processGoogleResponse, (state, action) => {
        try {
            const data = action.payload;
            if (data?.success && data?.response?.user && data?.response?.token) {
                const { user, token } = data.response;
                
                if (!user._id || !user.email || user.role === undefined) {
                    throw new Error('Invalid user data');
                }
    
                state.user = { ...user, token };
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.success = data.message || 'Successfully signed in with Google';
    
                localStorage.setItem('user', JSON.stringify({ ...user, token }));
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('token', token);
                
                console.log('Google auth successful:', { user, isAuthenticated: true });
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Google auth reducer error:', error);
            state.error = error.message;
            state.loading = false;
            state.isAuthenticated = false;
        }
    })
    .addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      const { user, token } = action.payload.response;
      state.loading = false;
      state.user = { ...user, token }; // Include all user data including role
      state.isAuthenticated = true;
      state.error = null;
      state.success = action.payload.message;
      localStorage.setItem('user', JSON.stringify({ ...user, token }));
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
    })
    .addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signInWithGoogle.fulfilled, (state, action) => {
      if (action.payload.response) {
        const { user, token } = action.payload.response;
        state.loading = false;
        state.user = { ...user, token }; // Include all user data including role
        state.isAuthenticated = true;
        state.error = null;
        state.success = action.payload.message;
        localStorage.setItem('user', JSON.stringify({ ...user, token }));
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');
      }
    })
    .addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      const { user, token } = action.payload.response;
      state.loading = false;
      state.user = { ...user, token }; // Include all user data including role
      state.isAuthenticated = true;
      state.error = null;
      state.success = action.payload.message;
      localStorage.setItem('user', JSON.stringify({ ...user, token }));
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
    })
    .addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase(signOut.pending, (state) => {
      state.loading = true;
    })
    .addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = 'Successfully signed out!';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    })
    .addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default authReducer;