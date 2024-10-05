import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserDocFromAuth } from '../firebase'; // Adjusted the import path
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignUpPage.css'; // Import the CSS file

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await createUserDocFromAuth(user, { name });
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Create a DEV@Deakin Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm password*</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SignUpPage;
