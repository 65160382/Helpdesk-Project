const pool = require('../config/database');

class UserActivity {
    //บันทึกจำนวนการเข้าสู่ระบบ
    static async recordLogin(userId) {
        const sql = `
            INSERT INTO user_activity (user_id, login_date)
            VALUES (?, NOW())
        `;
        await pool.execute(sql, [userId]);
    }

    static async getLoginCountByDate(date) {
        const sql = `
            SELECT COUNT(*) AS login_count
            FROM user_activity
            WHERE DATE(login_date) = ?
        `;
        const [rows] = await pool.execute(sql, [date]);
        return rows[0].login_count;
    }
}

module.exports = UserActivity;