import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const [timeLeft, setTimeLeft] = useState(20);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuiz(response.data);
                setAnswers(new Array(response.data.questions.length).fill(null));
            } catch (err) {
                console.error(err);
            }
        };
        fetchQuiz();

        return () => clearInterval(timerRef.current);
    }, [id]);

    const calculateScore = useCallback(() => {
        const correctAnswers = quiz.questions.filter((q, i) => q.answer === answers[i]);
        const finalScore = correctAnswers.length;
        setScore(finalScore);
        return finalScore;
    }, [answers, quiz]);

    const handleNextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(20);
        }
    };

    const handleSubmitQuiz = () => {
        clearInterval(timerRef.current);
        calculateScore();
        setQuizFinished(true);
    };

    useEffect(() => {
        if (quizFinished) {
            navigate('/quiz-result', { state: { score, totalQuestions: quiz.questions.length } });
        }
    }, [quizFinished, score, quiz, navigate]);

    useEffect(() => {
        if (quiz) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        if (currentQuestion < quiz.questions.length - 1) {
                            setCurrentQuestion(prev => prev + 1);
                            return 20;
                        } else {
                            clearInterval(timerRef.current);
                            calculateScore();
                            setQuizFinished(true);
                        }
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [quiz, currentQuestion, calculateScore]);

    const handleAnswerChange = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    if (!quiz) return <div>Loading...</div>;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 shadow p-4 rounded bg-warning-subtle">
    
            {currentQuestion < quiz.questions.length ? (
              <div>
                <p className="h4 mb-3">Q {currentQuestion + 1}/{quiz.questions.length}: {quiz.questions[currentQuestion].question}</p>
                {quiz.questions[currentQuestion].options.map((option, j) => (
                  <div key={j} className="form-check mb-2">
                    <input
                      className="form-check-input radio"
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={j}
                      checked={answers[currentQuestion] === j}
                      onChange={() => handleAnswerChange(j)}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
                <p className="text-muted">Time left: {timeLeft} seconds</p>
                {currentQuestion < quiz.questions.length - 1 ? (
                  <button className="btn btn-primary float-end" onClick={handleNextQuestion}>
                    Next Question
                  </button>
                ) : (
                  <button className="btn btn-success float-end" onClick={handleSubmitQuiz}>
                    Submit Quiz
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p className="h4">Your score: {score}/{quiz.questions.length}</p>
                <p>Percentile: {((score / quiz.questions.length) * 100).toFixed(2)}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default QuizPage;
