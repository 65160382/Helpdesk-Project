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
    const { firstname, lastname, email, phone, username, password } = req.body;

    // ตรวจสอบให้แน่ใจว่าทุกค่ามีอยู่
    if (!firstname || !lastname || !email || !phone || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // สร้างผู้ใช้ใหม่
    const newUser = new User(firstname, lastname, email, phone, username, password);
    try {
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error); // แสดงข้อผิดพลาดในคอนโซล
        res.status(500).json({ message: 'Error creating user', error });
    }
};

