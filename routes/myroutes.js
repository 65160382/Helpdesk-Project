const express = require('express');
const router = express.Router();

let ticket =[];

router.get('/',(req,res)=>{
    res.render('index')
});

router.get('/tickets',(req,res)=>{
    res.render('tickets')
});


module.exports = router;