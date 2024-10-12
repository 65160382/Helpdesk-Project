const bcrypt = require('bcryptjs'); 
const User = require('../models/userModel');


// แสดงหน้า Login
exports.getLoginPage = (req, res) => {
    res.render('login'); // ใช้ชื่อไฟล์ login.ejs หรือ login.html ใน views
};

// จัดการการ Login
exports.login = async (req, res) => {
    // ดึงค่า username และ password จาก request body
    const { username, password } = req.body;

    // ตรวจสอบว่ามีค่า username หรือ password หรือไม่
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // ค้นหาผู้ใช้โดยใช้ username
    const user = await User.findByUsername(username);
    
    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ตรวจสอบ password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

     // เก็บข้อมูลผู้ใช้ใน session
     req.session.user = {
        id: user.id,
        username: user.username
    };

    console.log('User logged in successfully')
    // หากเข้าสู่ระบบสำเร็จ
    res.redirect('/');
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
        console.log('User registered successfully');
        res.redirect('/login');
    } catch (error) {
        console.error(error); // แสดงข้อผิดพลาดในคอนโซล
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// log out ทำลาย session ทิ้ง
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        
        res.clearCookie('connect.sid'); // ลบ cookie ที่เก็บ session ID
        res.redirect('/');
    });
};

