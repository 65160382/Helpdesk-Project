const Knowledge = require('../models/knowModel'); // เรียกใช้ model

// Controller function เพื่อดึงข้อมูลจากฐานข้อมูล
exports.getAllBlogs = async (req, res) => {
    try {
        // ดึงข้อมูลจากตาราง knowledge
        const blogList = await Knowledge.getAll();
        
        // ส่งข้อมูลไปที่ view (knowledge.ejs)
        res.render('knowlist', { blogList });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller สำหรับค้นหาข้อมูลจาก title
exports.searchByTitle = async (req, res) => {
    try {
        const searchTitle = req.body.title; // รับค่าการค้นหาจากฟอร์ม

        // ตรวจสอบหากไม่มีค่า title ที่ส่งมา
        if (!searchTitle) {
            return res.status(400).send('Search term is required');
        }

        // ค้นหา title ที่ตรงกับข้อมูลในฐานข้อมูล
        const blogList = await Knowledge.searchTitle(searchTitle);
        
        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (blogList && blogList.length > 0) {
            res.render('knowlist', { blogList });
        } else {
            res.render('knowlist', { blogList: [], message: 'ไม่พบข้อมูล' });
        }  
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller สำหรับแสดงรายละเอียด Blog ตาม id
exports.getBlogDetails = async (req, res) => {
    try {
        const blogId = req.params.id; // รับค่า id จาก URL

        // ค้นหา blog ที่ตรงกับ id ที่ส่งมา
        const blog = await Knowledge.findById(blogId);

        // ตรวจสอบว่าพบ blog หรือไม่
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        // ส่งข้อมูล blog ไปยังหน้า view สำหรับแสดงรายละเอียด
        res.render('knowdetails', { blog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

