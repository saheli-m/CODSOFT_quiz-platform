import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizCreationPage from './pages/QuizCreationPage';
import QuizPage from './pages/QuizPage';
import QuizListPage from './pages/QuizListPage';
import QuizResultPage from './pages/QuizResultPage';
import Header from './components/Header';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
        window.location.reload();
        navigate('/');
    };

    return (
        <div className='app'>
            <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <div className='main'>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/create-quiz" element={isAuthenticated ? <QuizCreationPage /> : <LoginPage />} />
                  <Route path="/edit-quiz/:id" element={isAuthenticated ? <QuizCreationPage /> : <LoginPage />} />
                  <Route path="/quiz/:id" element={<QuizPage />} />
                  <Route path="/quizzes" element={<QuizListPage />} />
                  <Route path="/quiz-result" element={<QuizResultPage />} />
              </Routes>
            </div>
        </div>
    );
}

export default App;


