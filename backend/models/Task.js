const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true   // can't save a task without title
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],  // only these 3 values allowed
    default: 'pending'   // auto set to pending if not provided
  }
}, { timestamps: true });  // auto adds createdAt and updatedAt

module.exports = mongoose.model('Task', taskSchema);
