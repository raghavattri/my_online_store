import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice'; 
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isAdmin = useSelector(state=> state.auth.isAdmin)

    const navigate = useNavigate()

    const handleLogin =  () => {
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }
      try {
        dispatch(login({ username, password, navigate }));
        console.log("login idamin",isAdmin)
      } catch (err) {
        setError('Invalid username or password.');
      }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
