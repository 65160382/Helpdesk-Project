const bcrypt = require('bcryptjs')
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      
    //   // Bcrypt passwords before sending to EJS
    //   users.forEach(user => {
    //     user.password = bcrypt.hashSync(user.password, 10);
    //   });
  
      res.render('user', { users });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };