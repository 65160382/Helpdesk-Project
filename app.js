const express = require('express');


const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log(`Server runing at http://localhost:${port}`)
})
