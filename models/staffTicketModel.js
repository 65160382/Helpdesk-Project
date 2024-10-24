const pool = require('../config/database');

class StaffTicket{
    // ฟังก์ชันสำหรับการบันทึกข้อมูลลงตาราง staff_ticket
    static async assignStaffToTicket(ticketId, staffId) {
        const sql = `INSERT INTO staff_ticket (ticket_id, staff_id) VALUES (?, ?)`;
        const [result] = await pool.execute(sql, [ticketId, staffId]);
        return result;
    }
}

module.exports = StaffTicket;