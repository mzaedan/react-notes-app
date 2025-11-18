import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function LoginInput({ login, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="login-form" onSubmit={onSubmitHandler}>
      <label>Username or Email</label>
      <input 
        type="text"
        className="input-field"
        placeholder="Enter your username or email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        disabled={loading}
      />

      <label>Password</label>
      <div className="password-wrapper">
        <input 
          type={showPassword ? "text" : "password"}
          className="input-field"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={loading}
        />
        <span 
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>

      <a href="/forgot" className="forgot-pass">Forgot Password?</a>

      <button className="login-btn" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoginInput.defaultProps = {
  loading: false,
};

export default LoginInput;