const mongoose = require("mongoose");

// task schema
const TaskSchema = new mongoose.Schema({
  // task_name field
  task_name: {
    type: String,
  },

  //   description field
  description: {
    type: String,
  },

  //   prority field
  priority: {
    type: String,
  },
});

// export TaskSchema
module.exports = mongoose.model.Task || mongoose.model("Task", TaskSchema);