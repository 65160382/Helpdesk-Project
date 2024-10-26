const pool = require('../config/database');

class Question{
    static async createQuestion(ticket_id, user_id, question) {
        const sql = `
            INSERT INTO questions (ticket_id, user_id, question, created_at)
            VALUES (?, ?, ?, NOW())
        `;
        await pool.execute(sql, [ticket_id, user_id, question]);
    }

    static async getQuestionsByTicket(ticket_id) {
        const sql = `
            SELECT q.id AS question_id, q.question, q.created_at AS question_created_at, 
                   u.firstname, u.lastname, 
                   a.answer, a.created_at AS answer_created_at, 
                   s.firstname AS staff_firstname, s.lastname AS staff_lastname
            FROM questions q
            LEFT JOIN answers a ON q.id = a.question_id
            LEFT JOIN users u ON q.user_id = u.id
            LEFT JOIN staff s ON a.staff_id = s.id
            WHERE q.ticket_id = ?
            ORDER BY q.created_at ASC, a.created_at ASC
        `;
        const [rows] = await pool.execute(sql, [ticket_id]);
        return rows;
    }

    // ฟังก์ชันดึงข้อมูลคำถามมาแสดงผลในส่วนให้ staff ตอบ
    static async getAllQuestions() {
        const sql = `
            SELECT q.id AS question_id, q.question AS question, a.answer AS answer, q.created_at, u.firstname, u.lastname
            FROM questions q
            LEFT JOIN answers a ON q.id = a.question_id
            JOIN users u ON q.user_id = u.id
            ORDER BY q.created_at ASC
        `;
        const [rows] = await pool.execute(sql);
        return rows;
    }
}

module.exports = Question;