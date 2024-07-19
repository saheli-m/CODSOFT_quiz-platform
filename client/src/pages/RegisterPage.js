import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 p-4 rounded bg-success-subtle">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;



