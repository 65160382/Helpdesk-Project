const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.findAll();
      const user = req.session.user;
      
      const adminUsername = 'admin'; // Define the admin username
      
      if (user && user.username === adminUsername) {
          res.render('user', { users });
      } else {
          console.log('Unauthorized access attempt');
          res.status(403).send('Unauthorized');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
};