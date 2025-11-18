import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    if (user.password !== user.confirm) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await register({
        name: user.name,
        email: user.email,
        password: user.password
      });

      if (!error) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert("Failed to register: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1 className="register-title">Create Your Account</h1>
        <p className="register-sub">Start organizing your thoughts and ideas.</p>

        <RegisterInput register={onRegisterHandler} loading={loading} />

        <p className="register-login">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}