const pool = require('../config/database');

class TicketRequest {
    //บันทึกข้อมูลจำนวนคำขอ
    static async createRequest(ticket_id, created_at) {
        const sql = `
            INSERT INTO ticket_request (ticket_id, created_at)
            VALUES (?, ?)
        `;
        await pool.execute(sql, [ticket_id, created_at]);
    }

    static async getTicketCountByDate(date) {
        const sql = `
            SELECT COUNT(*) AS ticket_count
            FROM ticket_request
            WHERE DATE(created_at) = ?
        `;
        const [rows] = await pool.execute(sql, [date]);
        return rows[0].ticket_count;
    }
}

module.exports = TicketRequest;
