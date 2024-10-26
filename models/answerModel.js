const pool = require('../config/database');

class Answer {
    static async createAnswer(question_id, staff_id ,answer) {
        try {
            const sql = `
                INSERT INTO answers (question_id, staff_id, answer, created_at)
                VALUES (?, ?, ?, NOW())
            `;
            await pool.execute(sql, [question_id, staff_id, answer]);
        } catch (error) {
            console.error("Database error in createAnswer:", error);
            throw error;
        }
    }
}

module.exports = Answer;
