const Question = require('../models/questionModel');

// แสดงฟอร์มคำถามและคำถามที่เกี่ยวข้องกับ ticket_id
exports.getQuestion = async (req, res) => {
    const ticket_id = req.query.ticket_id;
    const user_id = req.session.user_id; // ดึง user_id จาก session

    try {
        // ดึงคำถามทั้งหมดที่เกี่ยวข้องกับ ticket_id
        const questions = await Question.getQuestionsByTicket(ticket_id);

        // ส่งข้อมูล ticket_id, user_id, และคำถามไปยัง view
        res.render('question', { ticket_id, user_id, questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันสร้างคำถาม
exports.createQuestion = async (req, res) => {
    try {
        const { ticket_id, question } = req.body;
        const user_id = req.session.user.id;
        // Save the question to the database
        await Question.createQuestion(ticket_id, user_id, question);
        res.redirect('/question?ticket_id=' + ticket_id);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).send('Server Error');
    }
};