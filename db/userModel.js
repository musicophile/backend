const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  mobile: {
    type: String,
    required: [true, "Please provide a mobile!"],
    unique: [true, "number Exist"],

  },

  name: {
    type: String,
    required: [true, "Please provide a name!"],

  },


});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
