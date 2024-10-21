const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const user = req.session.user; // ดึงข้อมูลผู้ใช้จาก session
              
        // ตรวจสอบว่าผู้ใช้ล็อกอินเข้ามาหรือไม่
        if (!user) {
            return res.status(401).send('Please log in to access this page.');
        }
        
        const allowedRoles = ['admin', 'staff']; // กำหนด role ที่อนุญาตให้เข้าถึงได้

        // ตรวจสอบว่า role ของผู้ใช้เป็น admin หรือ staff
        if (!allowedRoles.includes(user.roles)) {
            console.log('Unauthorized access attempt by:', user.username);
            return res.status(403).send('Unauthorized');
        } 
        
        // หาก role ถูกต้อง จะสามารถเข้าถึงได้
        res.render('user', { users });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
