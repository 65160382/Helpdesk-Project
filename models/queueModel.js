const pool = require('../config/database');

class Queue {
  constructor(title, description) {
    this.name = title;
    this.description = description;
  }

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
}

module.exports = Queue;
