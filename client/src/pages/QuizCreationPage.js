import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const QuizCreationPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: 0 }]);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchQuiz = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                    const quiz = response.data;
                    setTitle(quiz.title);
                    setDescription(quiz.description);
                    setQuestions(quiz.questions);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchQuiz();
        } else {
          setTitle('');
          setDescription('');
          setQuestions([{ question: '', options: ['', '', '', ''], answer: 0 }]);
        }
    }, [id]);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'question') {
            newQuestions[index].question = value;
        } else if (field.startsWith('option')) {
            const optionIndex = parseInt(field.split('-')[1], 10);
            newQuestions[index].options[optionIndex] = value;
        } else if (field === 'answer') {
            newQuestions[index].answer = parseInt(value, 10);
        }
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: 0 }]);
    };

    const handleDeleteQuestion = async (questionIndex) => {
      if (id) {
        const questionToDelete = questions[questionIndex];
        try {
          const token = localStorage.getItem('token');
          const response = await axios.delete(`http://localhost:5000/api/quizzes/${id}/questions/${questionToDelete._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
    
          if (response.status === 200) {
            const newQuestions = [...questions];
            newQuestions.splice(questionIndex, 1);
            setQuestions(newQuestions);
          } else {
            console.error('Delete question failed:', response.data);
          }
        } catch (err) {
          console.error('Delete question error:', err);
        }
      } else {
        console.warn('Cannot delete question: Quiz not yet saved.');
      }
    };  

    const handleSaveQuiz = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (id) {
                await axios.put(`http://localhost:5000/api/quizzes/${id}`, { title, description, questions }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/quizzes', { title, description, questions }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/quizzes');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteQuiz = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/quizzes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/quizzes');
        } catch (err) {
            console.error('Delete error:', err);
            console.error('Response error data:', err.response?.data);
        }
    };

    return (
      <div className="quizCre container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-10 shadow-sm p-4 rounded bg-success bg-opacity-25">
            <h2 className="text-center">{id ? 'Update Quiz' : 'Create Quiz'}</h2>
            <form onSubmit={handleSaveQuiz}>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">Quiz Title</label>
                <input
                  type="text"
                  className="form-control border-dark"
                  id="title"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control border-dark"
                  id="description"
                  rows="3"
                  placeholder="Enter quiz description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {questions.map((q, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex align-items-center">
                    <label htmlFor={`question-${index}`} className="me-3 text-nowrap">
                      Question {index + 1}:
                    </label>
                    <input
                      type="text"
                      className="form-control border-dark flex-grow-1"
                      id={`question-${index}`}
                      placeholder="Enter question"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex mt-2 justify-content-between">
                    <div className="d-flex flex-column">
                      {q.options.map((option, i) => (
                        <div key={i} className="me-2 mb-2">
                          <input
                            type="text"
                            className="form-control border-dark"
                            placeholder={`Option ${i + 1}`}
                            value={option}
                            onChange={(e) => handleQuestionChange(index, `option-${i}`, e.target.value)}
                            required
                          />
                        </div>
                      ))}
                      <div>
                        <p className='mb-2'>Correct Answer:</p>
                        <select
                        className="form-select ms-auto border-dark"
                        value={q.answer}
                        onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                        required
                      >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                      </select>
                      </div>
                    </div>
                    {id && (
                      <button type="button" className="delQst btn btn-danger ms-2" onClick={() => handleDeleteQuestion(index)}>
                        Delete Question
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" className="btn btn-primary mb-3" onClick={handleAddQuestion}>
                Add Question
              </button>
              {id && (
                <button type="button" className="delQzz btn btn-danger float-end" onClick={handleDeleteQuiz}>
                  Delete Quiz
                </button>
              )}
              <button type="submit" className="btn btn-success float-end ms-3">
                {id ? 'Update Quiz' : 'Create Quiz'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default QuizCreationPage;
