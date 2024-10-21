const express = require('express');
const router = express.Router();
const knowController = require('../controllers/knowController');

// เส้นทางไปที่หน้ารายการบล็อก
router.get('/knowledge', knowController.getAllBlogs);

// เส้นทางสำหรับค้นหาข้อมูลจาก title
router.post('/search', knowController.searchByTitle);

// แสดงรายละเอียด Blog
router.get('/knowdetails/:id', knowController.getBlogDetails);

module.exports = router;