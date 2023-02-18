const mongoose = require("mongoose");

// task schema
const InviteSchema = new mongoose.Schema({
  // task_name field
  c_email: {
    type: String,
  },

  //   description field
  taskId: {
    type: String,
  },

  //   prority field
  email: {
    type: String,
  },

    //   status field
    id: {
        type: String,
      },

    
});

// export TaskSchema
module.exports = mongoose.model.Invite || mongoose.model("Invite", InviteSchema);
