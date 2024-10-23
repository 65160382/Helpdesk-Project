const pool = require('../config/database');

class StaffQueue{
    // ฟังก์ชันบันทึก staff และ queue ลงตาราง staff_queue
    static async assignStaffToQueue(queueId, staffId) {
        const sql = 'INSERT INTO staff_queue (queue_id, staff_id) VALUES (?, ?)';
        const [result] = await pool.query(sql, [queueId, staffId]);
        return result;
    }
}

module.exports = StaffQueue;