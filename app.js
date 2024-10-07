const express = require('express');
const path = require('path');


const ticketRoutes = require('./routes/ticketRoutes') //import module file router
const authRoutes = require('./routes/authRoutes')


const app = express();
const port = 3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views')); //อ้างอิง views ที่อยู่ใน floder views
app.use(express.static(path.join(__dirname,'public'))); //อ้างอิงไฟล์ static ใน floder public
app.use(express.urlencoded({extended:true}));

// ใช้ router
app.use('/', ticketRoutes);  // เชื่อมต่อ routes
app.use(authRoutes);



app.listen(port,()=>{
    console.log(`Server runing at http://localhost:${port}`)
})
