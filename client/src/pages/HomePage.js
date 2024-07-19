import React from 'react';
import QuizListPage from './QuizListPage';

const HomePage = () => {
    return (
        <div className='home'>            
            <div className='banner'>
              <h4>Create, take, and share quizzes!</h4> 
            </div>
            <QuizListPage />           
        </div>
    );
};

export default HomePage;
