import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setCurrentUser(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes');
                setQuizzes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCurrentUser();
        fetchQuizzes();
    }, []);

    return (
        <div className='quizlist'>
            <div>
                {quizzes.map((quiz) => (
                    <div key={quiz._id} className='listItem d-flex justify-content-center shadow-sm'>
                        <div className='d-flex flex-column align-items-center'>
                            <div>
                              <p id='title'>{quiz.title}</p>
                              <p id='des'>{quiz.description}</p>
                            </div>
                            <Link to={`/quiz/${quiz._id}`} className='start link-offset-1 link-underline text-white link-underline-opacity-0'>Start Quiz</Link>
                        </div>
                        {currentUser && quiz.creator && currentUser._id === quiz.creator._id && (
                            <Link to={`/edit-quiz/${quiz._id}`} className='edit link-underline-info link-underline-opacity-100'>Edit</Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizListPage;



