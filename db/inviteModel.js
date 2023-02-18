const mongoose = require("mongoose");

// task schema
const InviteSchema = new mongoose.Schema({
  c_email: {
    type: String,
  },

  taskId: {
    type: String,
  },

  email: {
    type: String,
  },

    id: {
        type: String,
      },

    taskname: {
      type: String,
    },

    
});

// export TaskSchema
module.exports = mongoose.model.Invite || mongoose.model("Invite", InviteSchema);
