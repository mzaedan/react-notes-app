import React, { useState } from "react";
import PropTypes from "prop-types";

function RegisterInput({ register, loading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register({ name, email, password, confirm });
  };

  return (
    <form onSubmit={onSubmitHandler} className="register-form">
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />

      <label>Email Address</label>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm your password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        disabled={loading}
      />

      <button className="register-btn" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

RegisterInput.defaultProps = {
  loading: false,
};

export default RegisterInput;