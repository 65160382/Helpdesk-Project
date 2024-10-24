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
            SELECT q.question, q.created_at, u.firstname, u.lastname
            FROM questions q
            JOIN users u ON q.user_id = u.id
            WHERE q.ticket_id = ?
            ORDER BY q.created_at ASC
        `;
        const [rows] = await pool.execute(sql, [ticket_id]);
        return rows;
    }
}

module.exports = Question;