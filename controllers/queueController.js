const Queue = require("../models/queueModel");
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const StaffQueue = require('../models/staffQueueModel');
const StaffTicket = require('../models/staffTicketModel');

//เพิ่ม queue
exports.addToQueue = async (title, description) => {
  try {
    const newQueueEntry = new Queue(title, description);
    const result = await newQueueEntry.save();

    if (result && result.insertId) {
      return { insertId: result.insertId }; // Return the insertId in the correct format
    } else {
      throw new Error("Insert ID not found in queue save result");
    }
  } catch (error) {
    console.error("Error adding to queue:", error);
    throw new Error("Error adding to queue");
  }
};

//เเสดง Request ทั้งหมด
exports.getRequestData = async (req, res) => {
  try {
    const queueData = await Queue.getAll();
    const staffData = await User.getStaff(); // ฟังก์ชันดึงข้อมูล staff
    const sortOption = 'high'; // ตั้งค่าเริ่มต้น
    const user = req.session.user; // ดึงข้อมูลผู้ใช้จาก session // ตรวจสอบว่าผู้ใช้ล็อกอินเข้ามาหรือไม่

    
    if (!user) {
      return res.status(401).send("Please log in to access this page.");
    }

    const allowedRoles = ["admin"]; // กำหนด role ที่อนุญาตให้เข้าถึงได้ // ตรวจสอบว่า role ของผู้ใช้เป็น admin หรือ staff หรือไม่

    if (!allowedRoles.includes(user.roles)) {
      console.log("Unauthorized access attempt by:", user.username);
      return res.status(403).send("Unauthorized");
    }

    res.render("Request", { queueData,sortOption,staffData  });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching queue data");
  }
};

//เเสดง Queue ทั้งหมดที่ staff รับผิดชอบ
exports.getQueueData = async (req, res) => {
  try {
    const user = req.session.user; // Retrieve user data from session
    
    if (!user) {
      return res.status(401).send("Please log in to access this page.");
    }

    const allowedRoles = ["staff"];
    if (!allowedRoles.includes(user.roles)) {
      console.log("Unauthorized access attempt by:", user.username);
      return res.status(403).send("Unauthorized");
    }

    const sortOption = 'high'; // Default sort option

    // Retrieve queue data assigned to this staff member
    const queueData = await Queue.getStaffQueue(user.staff_id);

    res.render("queue", { queueData, sortOption, staffData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching queue data");
  }
};


//อัปเดตสถานะ ticket
exports.updateStatus = async (req, res) => {
  const queueId = req.params.id;
  const newStatus = req.body.status;

  try {
    await Queue.updateStatus(queueId, newStatus);
    res.redirect("/queue"); // Redirect back to the queue list after update
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Error updating status");
  }
};

//อัปเดตข้อมูลลงตาราง staff_queue
exports.assignStaff = async (req, res) => {
  try {
      const queueId = req.params.id;
      const staffId = req.body.staffId;
      
      //  ดึง ticketId ที่เชื่อมโยงกับ queueId จากตาราง queue
      const ticket = await Queue.getTicketByQueueId(queueId);
      const ticketId = ticket.id;

      // console.log('Assigning staff - Queue ID:', queueId);
      // console.log('Assigning staff - Staff ID:', staffId);
      // console.log(ticketId);

      // เพิ่มข้อมูล staffId และ queueId ลงในตาราง staff_queue
      await StaffQueue.assignStaffToQueue(queueId, staffId);

      // บันทึกข้อมูลลงตาราง staff_ticket
      await StaffTicket.assignStaffToTicket(ticketId, staffId);

      // อัปเดตสถานะในตาราง ticket เป็น "assign"
      await Ticket.updateStatus(ticketId, ' Assigned');

      res.redirect('/Request');
  } catch (error) {
      console.error('Error in assignStaff:', error);
  }
};

//เรียงลำดับความสำคัญ
exports.sortQueueByPriority = async (req, res) => {
  try {
      const sortOption = req.body.priority || 'high'; // กำหนดค่าเริ่มต้นเป็น 'high' ถ้าไม่มีค่า
      let sortedQueue;

      if (sortOption === 'high') {
          sortedQueue = await Queue.getSortedByPriority('high');
      } else if (sortOption === 'medium') {
          sortedQueue = await Queue.getSortedByPriority('medium');
      } else {
          sortedQueue = await Queue.getSortedByPriority('low');
      }

      const staffData = await User.getStaff(); // ดึงข้อมูล staff

      res.render('queue', { queueData: sortedQueue, sortOption, staffData }); // ส่ง sortOption และ staffData ไปยัง view
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
};

// ฟังก์ชันสำหรับลบ queue
exports.deleteQueue = async (req, res) => {
  try {
      const queueId = req.params.id; // ดึง id จาก URL
      await Queue.deleteById(queueId); // เรียกใช้ฟังก์ชันใน model เพื่อลบ queue

      res.redirect('/queue'); // หลังจากลบเสร็จให้กลับไปที่หน้า queue
  } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting queue');
  }
};

