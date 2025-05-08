import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from '../../auth/forgerockConfig';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userManager.signinRedirectCallback()
      .then(() => navigate('/')) // it is navigate to home
      .catch(err => console.error('OAuth callback error', err));
  }, [navigate]);

  return <p>Authenticating with ForgeRock...</p>;
};

export default Callback;
