const pool = require('../config/database');

class Staff {
    // ฟังก์ชันสำหรับดึง staff_id โดยใช้ user_id
    static async getStaffIdByUserId(userId) {
        const sql = 'SELECT id FROM staff WHERE user_id = ?';
        const [rows] = await pool.execute(sql, [userId]);
        return rows.length ? rows[0].id : null; // ส่งคืนค่า staff_id ถ้าพบ, ถ้าไม่พบส่ง null
    }
}

module.exports = Staff;
