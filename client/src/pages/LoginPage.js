import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                console.error('Response error data:', err.response.data);
                setError(err.response.data.error);
            } else {
                setError('Login failed');
            }
        }
    };

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 p-4 rounded bg-success-subtle">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary float-end">
                Login
              </button>
            </form>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </div>
        </div>
      </div>
    );
};

export default LoginPage;

