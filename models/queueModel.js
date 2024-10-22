const pool = require('../config/database');

class Queue {
  constructor(title, description) {
    this.name = title;
    this.description = description;
  }

  //บันทึก queue
  async save() {
    const sql = `INSERT INTO queue (name, description) VALUES (?, ?)`;
    const [result] = await pool.execute(sql, [this.name, this.description]);
    
    // Check the result structure and return the insertId
    if (result && result.insertId) {
        return { insertId: result.insertId }; // Return insertId in the correct format
    } else {
        throw new Error('Insert ID not found in result');
    }
    }

    //แสดง queue พร้อมข้อมูลชื่อผู้ใช้จากตาราง ticket
    static async getAll() {
        const sql = `
            SELECT queue.id, queue.name, queue.description, ticket.status , ticket.priority , users.firstname, users.lastname
            FROM queue
            JOIN ticket ON queue.id = ticket.queue_id
            JOIN users ON ticket.user_id = users.id
        `;
        const [rows] = await pool.query(sql);
        return rows;
    }

    //อัปเดตสถานะ queue
    static async updateStatus(id, status) {
        const sql = `UPDATE ticket SET status = ? WHERE queue_id = ?`;
        const [result] = await pool.execute(sql, [status, id]);
        return result;
    }

    // ฟังก์ชันสำหรับการเรียงลำดับ queue ตาม priority
    static async getSortedByPriority(priorityLevel) {
        const sql = `
            SELECT queue.id, queue.name, queue.description, ticket.status, ticket.priority, users.firstname, users.lastname
            FROM queue
            JOIN ticket ON queue.id = ticket.queue_id
            JOIN users ON ticket.user_id = users.id
            WHERE ticket.priority = ?
            ORDER BY ticket.priority DESC
        `;
        const [rows] = await pool.execute(sql, [priorityLevel]);
        return rows;
    }
}

module.exports = Queue;
