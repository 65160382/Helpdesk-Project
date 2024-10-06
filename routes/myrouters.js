// routes/myrouters.js
const express = require('express');
const router = express.Router();

let tickets = [];

router.get('/', (req, res) => {
    res.render('index');
});

// Route เพื่อรับข้อมูลจากฟอร์ม
router.post('/submit-ticket', (req, res) => {
    const { title, category, name, priority, description } = req.body;
    const newTicket = { title, category, name, priority, description };
    tickets.push(newTicket);
    res.redirect('/tickets');
});

// Route เพื่อแสดงข้อมูลในตาราง
router.get('/tickets', (req, res) => {
    res.render('tickets', { tickets });
});


module.exports = router;
