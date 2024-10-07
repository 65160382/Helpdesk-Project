// controllers/authController.js
const User = require('../models/userModel');

// แสดงหน้า Login
exports.getLoginPage = (req, res) => {
    res.render('login'); // ใช้ชื่อไฟล์ login.ejs หรือ login.html ใน views
};

// จัดการการ Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    // ตรวจสอบผู้ใช้งานจากฐานข้อมูล (สมมุติว่ามี model User)
    const user = await User.findByEmail(email);

    if (user && user.password === password) {
        // ถ้ารหัสผ่านถูกต้องให้เข้าสู่ระบบ
        res.redirect('/dashboard'); // นำผู้ใช้ไปหน้าหลักหรือ dashboard
    } else {
        res.status(401).send('Invalid credentials');
    }
};

// แสดงหน้า Register
exports.getRegisterPage = (req, res) => {
    res.render('register'); // ใช้ชื่อไฟล์ register.ejs หรือ register.html ใน views
};

// จัดการการ Register
exports.register = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }

    // สร้างผู้ใช้ใหม่
    const newUser = new User(name, email, password);
    await newUser.save();

    res.redirect('/login');
};
