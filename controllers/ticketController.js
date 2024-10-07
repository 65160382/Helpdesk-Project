const Ticket = require('../models/ticketModel')

// ฟังก์ชันแสดงฟอร์มคำร้องขอ
exports.getForm = (req, res) => {
    res.render('index');  // เรียกฟอร์มที่สร้างไว้
};

// ฟังก์ชันสร้างคำร้องขอใหม่
exports.createTicket = async (req, res) => {
    try {
        const { title, name, priority, description } = req.body;  // ดึงข้อมูลจากฟอร์ม
        const ticket = new Ticket(title, name, priority, description);  // สร้าง instance ของ Ticket
        await ticket.save();  // เรียกใช้ฟังก์ชัน save() เพื่อเพิ่มข้อมูลในฐานข้อมูล
        res.redirect('tickets');  // เปลี่ยนเส้นทางไปยังหน้าแสดงรายการคำร้องขอ
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating ticket');  // จัดการข้อผิดพลาด
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