const Ticket = require('../models/ticketModel')
const queueController = require('./queueController');

// ฟังก์ชันแสดงฟอร์มคำร้องขอ
exports.getForm = (req, res) => {
    res.render('index');  // เรียกฟอร์มที่สร้างไว้
};

// ฟังก์ชันสร้างคำร้องขอใหม่
exports.createTicket = async (req, res) => {
    try {
      const { title, date, priority, description } = req.body; // Get data from the form
      const userId = req.session.user && req.session.user.id; // Check if req.session.user exists before accessing id
  
      if (!userId) {
        throw new Error('User ID is undefined or not found in session');
      }
  
      const ticket = new Ticket(title, date, priority, description);
  
      // Save the queue and get the queue result
      const queueResult = await queueController.addToQueue(title, description);
  
  
      const queueId = queueResult.insertId;
      // console.log("Generated queueId:", queueId);
  
      await ticket.save(userId, queueId);
  
      res.redirect('tickets');
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating ticket');
    }
  };

// ฟังก์ชันดึงรายการคำร้องขอทั้งหมด
exports.getAllTickets = async (req, res) => {
  try {
      const user = req.session.user; // ดึงข้อมูลผู้ใช้จาก session
      
      if (!user) {
          return res.status(401).send('User not logged in');
      }

      const tickets = await Ticket.fetchByUserId(user.id);  // ดึง ticket ตาม user id ที่ login เข้ามา

      res.render('tickets', { tickets });  // ส่งข้อมูล ticket ไปยัง view
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching tickets');
  }
};