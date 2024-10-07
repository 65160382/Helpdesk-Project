const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// เส้นทางเพื่อแสดงฟอร์มสร้างคำร้องขอใหม่
router.get('/', ticketController.getForm);

// เส้นทางเพื่อสร้างคำร้องขอใหม่
router.post('/submit-ticket', ticketController.createTicket);

// เส้นทางเพื่อแสดงคำร้องขอทั้งหมด
router.get('/tickets', ticketController.getAllTickets);

module.exports = router;