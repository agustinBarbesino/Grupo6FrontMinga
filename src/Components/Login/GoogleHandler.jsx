import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { processGoogleResponse } from '../../store/actions/authActions';

const GoogleAuthHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    
    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

      
        const processedUser = {
          ...user,
          role: user.role ?? 0, 
          author_id: user.author_id || null,
          company_id: user.company_id || null
        };

        

       
        dispatch(processGoogleResponse({
          token,
          user: processedUser
        }));

       
        navigate('/home');
      } catch (error) {
        console.error('Error processing Google auth response:', error);
        navigate('/signin?error=auth_failed');
      }
    } else {
      navigate('/signin?error=missing_credentials');
    }
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Google Sign In...</h2>
        <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default GoogleAuthHandler;