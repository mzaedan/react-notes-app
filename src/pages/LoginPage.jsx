import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginInput from '../components/LoginInput';
import { login, putAccessToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function LoginPage({ loginSuccess }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    setLoading(true);
    try {
      const { error, data } = await login({ email, password });

      if (!error) {
        // Store the access token
        putAccessToken(data.accessToken);
        
        // Notify parent component of successful login
        loginSuccess({ email });
        
        // Redirect to home page
        navigate('/');
      }
    } catch (err) {
      alert('Failed to login: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">

      {/* LEFT IMAGE */}
      <div className="login-left">
        <img 
          src="/images/login_side.png" 
          alt="Login Illustration"
          className="login-image"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Let's get your ideas organized.</p>

        <LoginInput login={onLogin} loading={loading} />

        <div className="divider">Or continue with</div>

        <div className="oauth-buttons">
          <button className="oauth-btn">
            <img src="/images/google_logo.png" alt="google" />
            Google
          </button>

          <button className="oauth-btn">
            <img src="/images/apple_logo.png" alt="apple" />
            Apple
          </button>
        </div>

        <p className="signup-text">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;