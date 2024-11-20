const express = require('express')
const router = express.Router()
const queueController = require('../controllers/queueController')

//เเสดง request ทั้งหมดสำหรับให้ Admin กำหนด staff ที่รับผิดชอบ
router.get('/Request', queueController.getRequestData);

//เเสดง Queue ทั้งหมดที่ staff รับผิดชอบ
router.get('/queue',queueController.getQueueData);

//อัปเดตสถานะ ticket
router.post('/queue/:id/updateStatus', queueController.updateStatus);

// Route สำหรับการเรียงลำดับลำดับความสำคัญ
router.post('/queue/sort', queueController.sortQueueByPriority);

// Route สำหรับลบ queue
router.post('/queue/:id/delete', queueController.deleteQueue);

//อัพเดตข้อมูลลง staff_ticket
router.post('/queue/:id/assignStaff',queueController.assignStaff)

module.exports = router;