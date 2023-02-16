const mongoose = require("mongoose");

// task schema
const TaskSchema = new mongoose.Schema({
  // task_name field
  taskname: {
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

    //   status field
    status: {
        type: String,
      },
});

// export TaskSchema
module.exports = mongoose.model.Task || mongoose.model("Task", TaskSchema);
