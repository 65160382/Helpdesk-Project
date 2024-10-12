const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(firstname, lastname, email, phone, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.password = password;
    }

    // ฟังก์ชันเพื่อบันทึกผู้ใช้ใหม่
    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const sql = `INSERT INTO users (firstname, lastname, email, phone, username, password) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [this.firstname, this.lastname, this.email, this.phone , this.username, hashedPassword]);
        return result;
    }
    

    // ฟังก์ชันเพื่อตรวจสอบข้อมูลการเข้าสู่ระบบ
    static async findByUsername(username) {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const [rows] = await pool.execute(sql, [username]);
        return rows[0];
    }

    //แสดงข้อมูล user 
    static async findAll() {
        const sql = 'SELECT id, firstname, lastname, email, phone, username FROM users';
        const [rows] = await pool.execute(sql);
        return rows;
    }
}

module.exports = User;
