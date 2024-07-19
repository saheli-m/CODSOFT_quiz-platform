const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
    const { title, description, questions } = req.body;
    const creator = req.user.id;

    try {
        const quiz = await Quiz.create({ title, description, questions, creator });
        res.status(201).json(quiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('creator', 'username');
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('creator', 'username');
        if (!quiz) throw new Error('Quiz not found');
        res.status(200).json(quiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) throw new Error('Quiz not found');

        if (quiz.creator.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        quiz.title = req.body.title || quiz.title;
        quiz.description = req.body.description || quiz.description;
        quiz.questions = req.body.questions || quiz.questions;

        const updatedQuiz = await quiz.save();
        res.status(200).json(updatedQuiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.creator.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    console.log(deletedQuiz);
    res.status(200).json({ message: 'Quiz deleted' });
  } catch (err) {
    console.error('Server error during deletion:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const quizId = req.params.id;
    const questionId = req.params.questionId;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.creator.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const questionIndex = quiz.questions.findIndex(q => q._id.toString() === questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ error: 'Question not found in quiz' });
    }

    quiz.questions.splice(questionIndex, 1);
    await quiz.save();

    res.status(200).json({ message: 'Question deleted' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



