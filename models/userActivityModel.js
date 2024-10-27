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

    static async getWeeklyLoginCount() {
        const sql = `
            SELECT 
                DATE(login_date) as date,
                COUNT(*) as count
            FROM user_activity
            WHERE login_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY DATE(login_date)
            ORDER BY date ASC
        `;
        const [rows] = await pool.execute(sql);
        return rows;
    }

    static async getMonthlyLoginCount() {
        const sql = `
            SELECT 
                DATE_FORMAT(login_date, '%Y-%m') as month,
                COUNT(*) as count
            FROM user_activity
            WHERE login_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(login_date, '%Y-%m')
            ORDER BY month ASC
        `;
        const [rows] = await pool.execute(sql);
        return rows;
    }
}

module.exports = UserActivity;