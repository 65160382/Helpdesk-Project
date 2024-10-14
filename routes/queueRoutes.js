const express = require('express')
const router = express.Router()
const queueController = require('../controllers/queueController')

//เเสดง queue ทั้งหมดพร้อมข้อมูลชื่อผู้ใช้
router.get('/queue', queueController.getQueueData);

//อัปเดตสถานะ ticket
router.post('/queue/:id/updateStatus', queueController.updateStatus);

module.exports = router;