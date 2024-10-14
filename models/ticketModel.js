const pool = require('../config/database');

class Ticket {
    constructor(title, date, priority, description) {
        this.title = title;
        this.date = date;
        this.priority = priority;
        this.description = description;
        this.status = 'New'; // กำหนดสถานะเริ่มต้น
    }

    // ฟังก์ชันเพื่อเพิ่มคำร้องขอใหม่
    async save(userId, queueId) {
        if (!userId || !queueId) {
            throw new Error('User ID or Queue ID is undefined');
        }

        const sql = `INSERT INTO ticket (title, date, priority, description, status, user_id, queue_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [this.title, this.date, this.priority, this.description, this.status, userId, queueId]);
        return result;
    }
    
    // ฟังก์ชันดึงรายการคำร้องขอทั้งหมด (ถ้าต้องการ)
    static async fetchAll() {
        const sql = `SELECT * FROM ticket`;
        const [rows] = await pool.execute(sql);
        return rows;
    }
}

module.exports = Ticket;