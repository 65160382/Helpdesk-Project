const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const Staff = require('../models/staffModel');

// แสดงคำถามในหน้า answer.ejs
exports.getQuestionsAndAnswers = async (req, res) => {
    try {
        const user = req.session.user; // ดึงข้อมูลผู้ใช้จาก session 
        const userId = req.session.user.id; // ดึง user_id จาก session
        
        if (!user) {
            return res.status(401).send("Please log in to access this page.");
        }
      
        const allowedRoles = ["admin", "staff"]; // กำหนด role ที่อนุญาตให้เข้าถึงได้ // ตรวจสอบว่า role ของผู้ใช้เป็น admin หรือ staff หรือไม่
      
        // ตรวจสอบว่า Role ของผู้ใช้ไม่อยู่ในรายการ Role ที่ได้รับอนุญาต
        if (!allowedRoles.includes(user.roles)) {
            return res.status(403).send("Unauthorized");
        }
               
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