const pool = require('../config/database');

class Knowledge {
    // ฟังก์ชันเพื่อดึงข้อมูลทั้งหมดจากตาราง knowledge
    static async getAll() {
        const sql = `SELECT * FROM knowledgeBase`; // ดึงทุก column จากตาราง knowledge
        const [rows] = await pool.query(sql); // ดึงข้อมูลจาก database
        return rows; // ส่งข้อมูลกลับมาในรูปแบบ array ของ object
    }

    // ฟังก์ชันค้นหา title ที่ตรงกับค่า search term
    static async searchTitle(title) {
        const sql = `SELECT * FROM knowledgeBase WHERE title LIKE ?`; // ค้นหาข้อมูลที่ตรงกับ title
        const [rows] = await pool.query(sql, [`%${title}%`]); // ใช้ %title% เพื่อค้นหาข้อมูลที่มีคำใน title ที่เกี่ยวข้อง
        return rows; // ส่งข้อมูลที่ค้นหาพบกลับไป
    }

    static async findById(id) {
        const sql = `SELECT * FROM knowledgeBase WHERE id = ?`; // ดึงข้อมูลจากฐานข้อมูลตาม id
        const [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return rows[0]; // ส่งข้อมูล Blog ที่ตรงกับ id กลับไป
        } else {
            return null;
        }
    }
}

module.exports = Knowledge;