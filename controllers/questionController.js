const Question = require('../models/questionModel');

// Display the question form
exports.getQuestion = (req, res) => {
    const ticket_id = req.query.ticket_id;
    const user_id = req.session.user.id; 
    res.render('question', { ticket_id, user_id });
};

// Handle question submission
exports.createQuestion = async (req, res) => {
    try {
        const { ticket_id, question } = req.body;
        const user_id = req.session.user.id;
        // Save the question to the database
        await Question.createQuestion(ticket_id, user_id, question);

        
        res.redirect(`/tickets/${ticket_id}/conversation`);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).send('Server Error');
    }
};