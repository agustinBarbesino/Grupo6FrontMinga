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
        console.log('Google Response received:', action.payload);
        const { token, user } = action.payload;

        if (!user || !user._id || !user.email) {
          throw new Error('Invalid user data');
        }

        const userData = {
          ...user,
          token,
          role: user.role ?? 0,
          author_id: user.author_id || null,
          company_id: user.company_id || null
        };

        console.log('Processed user data:', userData);

        state.user = userData;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        state.success = 'Successfully signed in with Google';

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', token);

        console.log('Data saved to localStorage:', {
          user: JSON.parse(localStorage.getItem('user')),
          isAuthenticated: localStorage.getItem('isAuthenticated'),
          token: localStorage.getItem('token')
        });
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
      state.user = { 
        ...user, 
        token,
        role: user.role ?? 0,
        author_id: user.author_id || null,
        company_id: user.company_id || null
      };
      state.isAuthenticated = true;
      state.error = null;
      state.success = action.payload.message;
      localStorage.setItem('user', JSON.stringify({ 
        ...user, 
        token,
        role: user.role ?? 0,
        author_id: user.author_id || null,
        company_id: user.company_id || null
      }));
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
        state.user = { 
          ...user, 
          token,
          role: user.role ?? 0,
          author_id: user.author_id || null,
          company_id: user.company_id || null
        };
        state.isAuthenticated = true;
        state.error = null;
        state.success = action.payload.message;
        localStorage.setItem('user', JSON.stringify({ 
          ...user, 
          token,
          role: user.role ?? 0,
          author_id: user.author_id || null,
          company_id: user.company_id || null
        }));
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
      state.user = { 
        ...user, 
        token,
        role: user.role ?? 0,
        author_id: user.author_id || null,
        company_id: user.company_id || null
      };
      state.isAuthenticated = true;
      state.error = null;
      state.success = action.payload.message;
      localStorage.setItem('user', JSON.stringify({ 
        ...user, 
        token,
        role: user.role ?? 0,
        author_id: user.author_id || null,
        company_id: user.company_id || null
      }));
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