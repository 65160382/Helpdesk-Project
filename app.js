//import package module
const express = require('express');
const path = require('path');
const session = require('express-session');


//import module file router
const ticketRoutes = require('./routes/ticketRoutes'); 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const knowRoutes = require('./routes/knowRoutes');
const questionRoutes = require('./routes/questionRoutes');


const app = express();
const port = 3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views')); //อ้างอิง views ที่อยู่ใน floder views

app.use(express.static(path.join(__dirname,'public'))); //อ้างอิงไฟล์ static ใน floder public
app.use(express.urlencoded({extended:true}));

// ตั้งค่า session middleware
app.use(session({
    secret: 'mysession', // ใช้คีย์ลับสำหรับการเข้ารหัส session
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // ถ้าใช้ https ให้เปลี่ยนเป็น true
}));

app.use((req, res, next) => {
    // ถ้าผู้ใช้ล็อกอิน ให้ส่ง username ไปกับ response
    if (req.session.user) {
        res.locals.username = req.session.user.username;
    } else {
        res.locals.username = null; // ตั้งค่าเป็น null ถ้าไม่มีผู้ใช้ล็อกอิน
    }
    next();
});

// กำหนด express ให้อ่านข้อมูลที่ส่งมาในรูปแบบของ json คือ ข้อมูลที่ส่งมาจาก API
app.use(express.json());

// ใช้ router
app.use('/', ticketRoutes);  // เชื่อมต่อ routes
app.use(authRoutes);
app.use(userRoutes);
app.use(queueRoutes);
app.use(knowRoutes);
app.use(questionRoutes);



app.listen(port,()=>{
    console.log(`Server runing at http://localhost:${port}`)
})
