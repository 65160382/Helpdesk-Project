const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }


    // ฟังก์ชันเพื่อบันทึกผู้ใช้ใหม่
    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const [result] = await pool.execute(sql, [this.username, hashedPassword]);
        return result;
    }

    // ฟังก์ชันเพื่อตรวจสอบข้อมูลการเข้าสู่ระบบ
    static async findByUsername(username) {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const [rows] = await pool.execute(sql, [username]);
        return rows[0];
    }
}

module.exports = User;
