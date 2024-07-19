const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            answer: { type: Number, required: true },
        },
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Quiz', QuizSchema);
