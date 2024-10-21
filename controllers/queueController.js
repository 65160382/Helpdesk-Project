const Queue = require("../models/queueModel");

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

//เเสดง queue ทั้งหมดพร้อมข้อมูลชื่อผู้ใช้
exports.getQueueData = async (req, res) => {
  try {
    const queueData = await Queue.getAll();
    const user = req.session.user; // ดึงข้อมูลผู้ใช้จาก session // ตรวจสอบว่าผู้ใช้ล็อกอินเข้ามาหรือไม่

    if (!user) {
      return res.status(401).send("Please log in to access this page.");
    }

    const allowedRoles = ["admin", "staff"]; // กำหนด role ที่อนุญาตให้เข้าถึงได้ // ตรวจสอบว่า role ของผู้ใช้เป็น admin หรือ staff หรือไม่

    if (!allowedRoles.includes(user.roles)) {
      console.log("Unauthorized access attempt by:", user.username);
      return res.status(403).send("Unauthorized");
    }

    res.render("queue", { queueData });
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
