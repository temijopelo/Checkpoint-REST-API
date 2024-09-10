const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    uniquie: true,
  },
  age: Number,
  isMarried: Boolean,
});

module.exports = mongoose.model("user", UserSchema);
