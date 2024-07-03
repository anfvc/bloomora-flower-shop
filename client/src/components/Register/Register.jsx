import React, { useState } from 'react';
import './Register.css';

function Register({ openLogin, closeModals }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend işlemleri burada yapılacak.
    openLogin();
  };

  return (
    <div className="registerModal">
      <div className="registerContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            placeholder='Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder='abcd@example.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder='abcD&12345'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>Already have an account? <a href="#" className='registerToLogin' onClick={openLogin}>Login</a></p>
          <button type="submit" className='registerButton'>Register</button>
        </form>
        <button className='closeRegisterButton' onClick={closeModals}>X</button>
      </div>
    </div>
  );
}

export default Register;
