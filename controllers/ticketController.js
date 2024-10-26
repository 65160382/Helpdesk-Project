const Ticket = require('../models/ticketModel')
const queueController = require('./queueController');
const TicketRequest = require('../models/ticketRequestModel');

// ฟังก์ชันแสดงฟอร์มคำร้องขอ
exports.getForm = (req, res) => {
    res.render('index');  // เรียกฟอร์มที่สร้างไว้
};

// ฟังก์ชันสร้างคำร้องขอใหม่
exports.createTicket = async (req, res) => {
  try {
      const { title, date, priority, description } = req.body; // รับข้อมูลจากฟอร์ม
      const userId = req.session.user && req.session.user.id; // ตรวจสอบว่ามี req.session.user ก่อนที่จะเข้าถึง id

      if (!userId) {
          throw new Error('User ID is undefined or not found in session'); // Error ถ้า userId ไม่ถูกกำหนดหรือไม่พบใน session
      }

      const ticket = new Ticket(title, date, priority, description);
      
      // บันทึกคิวและรับผลลัพธ์ของคิว
      const queueResult = await queueController.addToQueue(title, description);
      const queueId = queueResult.insertId;

      // บันทึกตั๋วและดึง ID ของตั๋วที่สร้างขึ้น
      const savedTicket = await ticket.save(userId, queueId);

      //ตรวจสอบว่า savesTicket สร้าง ticket สำเร็จแล้ว มีค่า ticket.id return กลับมา
      if (!savedTicket.insertId) {
        throw new Error('Failed to create ticket, ticket ID is undefined');
    }
      
      //บันทึก log ticket ที่สร้างใหม่เพื่อเอาไปทำ report
      await TicketRequest.createRequest(savedTicket.insertId, new Date()); 

      res.redirect('tickets'); // เปลี่ยนเส้นทางไปยังหน้า tickets
  } catch (error) {
      console.error(error);
      res.status(500).send('Error creating ticket'); // ส่งข้อความแสดงข้อผิดพลาดถ้าเกิดข้อผิดพลาดในการสร้างตั๋ว
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