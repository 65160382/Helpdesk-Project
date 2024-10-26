const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const Staff = require('../models/staffModel');

// แสดงคำถามในหน้า answer.ejs
exports.getQuestionsAndAnswers = async (req, res) => {
    try {
        const userId = req.session.user.id; // ดึง user_id จาก session
        const questions = await Question.getAllQuestions();
        // console.log('Questions:', questions); // ตรวจสอบค่าของ questions

        // ดึง staff_id จาก staffModel
        const staff_id = await Staff.getStaffIdByUserId(userId);
        // console.log(staff_id);
        res.render('answer', { questions , staff_id});
    } catch (error) {
        console.error('Error fetching questions and answers:', error);
        res.status(500).send('Server Error');
    }
};

// เพิ่มคำตอบ
exports.addAnswer = async (req, res) => {
    try {
        const { question_id, staff_id ,answer } = req.body;
        // console.log(question_id)
        // console.log(answer)
        // console.log(staff_id);
        await Answer.createAnswer(question_id, staff_id ,answer); // เพิ่มคำตอบในฐานข้อมูล
        res.redirect('/answers');
    } catch (error) {
        console.error('Error adding answer:', error);
        res.status(500).send('Server Error');
    }
};