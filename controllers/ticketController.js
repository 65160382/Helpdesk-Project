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
      console.log("Generated queueId:", queueId);
  
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
        const tickets = await Ticket.fetchAll();  // เรียกใช้ฟังก์ชัน fetchAll() เพื่อดึงข้อมูลทั้งหมด
        res.render('tickets', { tickets });  // ส่งข้อมูลไปยัง View
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tickets');
    }
};