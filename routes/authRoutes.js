const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// แสดงหน้า Login
router.get('/login', authController.getLoginPage);

// จัดการการล็อกอิน
router.post('/login', authController.login);

router.get('/logout',authController.logout)

// แสดงหน้า Register
router.get('/register', authController.getRegisterPage);

// จัดการการลงทะเบียน
router.post('/register', authController.register);

module.exports = router;
