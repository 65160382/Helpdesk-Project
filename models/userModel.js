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
        
        /* -- เลือกฟิลด์ id, username, password จากตาราง users
        -- และใช้ฟังก์ชัน GROUP_CONCAT เพื่อรวมค่า role_name จากตาราง roles เข้าด้วยกันเป็น string เดียว
        SELECT users.id, users.username, users.password, GROUP_CONCAT(roles.role_name) AS roles
        FROM users
        -- ทำการ join ตาราง user_roles โดยเชื่อมต่อกับตาราง users ผ่านฟิลด์ user_id
        JOIN user_roles ON users.id = user_roles.user_id
        -- ทำการ join ตาราง roles โดยเชื่อมต่อกับตาราง user_roles ผ่านฟิลด์ role_id
        JOIN roles ON user_roles.role_id = roles.id
        -- กำหนดเงื่อนไขในการดึงข้อมูล โดยเลือกเฉพาะผู้ใช้ที่มี username ตรงกับค่าที่ระบุ
        WHERE users.username = ?
        -- ทำการจัดกลุ่มข้อมูลตาม users.id เพื่อให้แน่ใจว่าผู้ใช้แต่ละคนจะมีเพียงหนึ่งแถวในผลลัพธ์
        -- และค่า role ทั้งหมดจะถูกรวมเข้าด้วยกันในคอลัมน์ roles
        GROUP BY users.id;
        */        
        const sql = ` 
            SELECT users.id, users.username, users.password, GROUP_CONCAT(roles.role_name) AS roles
            FROM users
            JOIN user_roles ON users.id = user_roles.user_id
            JOIN roles ON user_roles.role_id = roles.id
            WHERE users.username = ?
            GROUP BY users.id
        `;
        const [rows] = await pool.execute(sql, [username]);
    
        if (rows.length > 0) {
            const user = rows[0];
            return user;
        } else {
            return null;
        }
    }
    

    //แสดงข้อมูล user 
    static async findAll() {
        const sql = 'SELECT id, firstname, lastname, email, phone, username FROM users';
        const [rows] = await pool.execute(sql);
        return rows;
    }
}

module.exports = User;
