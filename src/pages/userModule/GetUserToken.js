import React, { useState, useEffect } from 'react';
import Loader from '../../Components/Common/Loader';

const GetUserToken = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);

        // Extract the token from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const userToken = queryParams.get('token');

        if (!userToken) {
          throw new Error('Token not found in URL');
        }

        setToken(userToken);

        // Simulate an API call or token validation if needed
        setTimeout(() => {
          setLoading(false);
        }, 2000);

      } catch (err) {
        setError(err.message || 'Failed to fetch token');
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <Loader error={error} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Token fetched successfully!</h2>
      <p>Your Token: {token}</p>
    </div>
  );
};

export default GetUserToken;
