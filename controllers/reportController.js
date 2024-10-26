const UserActivity = require('../models/userActivityModel');
const TicketRequest = require('../models/ticketRequestModel');

exports.getReport = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const user = req.session.user; // ดึงข้อมูลผู้ใช้จาก session // ตรวจสอบว่าผู้ใช้ล็อกอินเข้ามาหรือไม่

        if (!user) {
            return res.status(401).send("Please log in to access this page.");
        }
      
        const allowedRoles = ["admin", "staff"]; // กำหนด role ที่อนุญาตให้เข้าถึงได้ // ตรวจสอบว่า role ของผู้ใช้เป็น admin หรือ staff หรือไม่
      
        if (!allowedRoles.includes(user.roles)) {
            console.log("Unauthorized access attempt by:", user.username);
            return res.status(403).send("Unauthorized");
        }
        
        // ดึงจำนวนการเข้าสู่ระบบของผู้ใช้ในวันนี้
        const loginCount = await UserActivity.getLoginCountByDate(today);

        // ดึงจำนวนการส่งคำขอ Ticket ของผู้ใช้ในวันนี้
        const ticketCount = await TicketRequest.getTicketCountByDate(today);
        
        // ส่ง loginCount และ ticketCount ไปที่หน้า report.ejs
        res.render('report', { loginCount, ticketCount });
    } catch (error) {
        console.error('Error fetching user login report:', error);
        res.status(500).send('Server Error');
    }
};
