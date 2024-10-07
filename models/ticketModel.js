const pool = require('../config/database');

class Ticket {
    constructor(title, name, priority, description) {
        this.title = title;
        this.priority = priority;
        this.description = description;
        this.status = 'new'; // กำหนดสถานะเริ่มต้น
    }

    // ฟังก์ชันเพื่อเพิ่มคำร้องขอใหม่
    async save() {
        const sql = `INSERT INTO ticket (title, priority, description, status) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [this.title, this.priority, this.description, this.status]);
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