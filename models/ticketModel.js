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
    
    // ฟังก์ชันดึงรายการคำร้องขอทั้งหมด 
    static async fetchByUserId(userId) {
        const sql = `SELECT * FROM ticket WHERE user_id = ?`; // user_id คือ column ในตาราง ticket ที่ใช้เชื่อมกับ user
        const [rows] = await pool.execute(sql, [userId]); // ส่งค่า userId เข้าไปในคำสั่ง SQL
        return rows;
    }

    //อัพเดตสถานะหลังจากกำหนด staff 
    static async updateStatus(ticketId, status) {
        const sql = `
            UPDATE ticket
            SET status = ?
            WHERE id = ?
        `;
        const [result] = await pool.execute(sql, [status, ticketId]);
        // return result;
    }
    
}

module.exports = Ticket;