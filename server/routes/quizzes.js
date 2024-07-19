const router = require('express').Router();
const { createQuiz, getQuizzes, getQuiz, updateQuiz, deleteQuiz, deleteQuestion } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.put('/:id', protect, updateQuiz);
router.delete('/:id', protect, deleteQuiz);

router.delete('/:id/questions/:questionId', protect, deleteQuestion);

module.exports = router;




