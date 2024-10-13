const Queue = require('../models/queueModel');

exports.addToQueue = async (title, description) => {
    try {
      const newQueueEntry = new Queue(title, description);
      const result = await newQueueEntry.save();
  
      if (result && result.insertId) {
        return { insertId: result.insertId }; // Return the insertId in the correct format
      } else {
        throw new Error('Insert ID not found in queue save result');
      }
  
    } catch (error) {
      console.error("Error adding to queue:", error);
      throw new Error('Error adding to queue');
    }
  };
