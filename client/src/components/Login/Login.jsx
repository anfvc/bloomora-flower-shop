import React, { useState } from 'react';
import './Login.css';

function Login({ openRegister, closeModals }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend işlemleri burada yapılacak.
  };

  return (
    <div className="loginModal">
      <div className="loginContainer">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <p>If you don't have an account, <a href="#" className='loginToRegister' onClick={openRegister}>Register</a></p>
          <button type="submit" className='loginButton'>Login</button>
        </form>
        <button className='closeLoginButton' onClick={closeModals}>X</button>
      </div>
    </div>
  );
}

export default Login;
