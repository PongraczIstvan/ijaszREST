const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: String,
    loginCount: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
  },
  { collection: "user", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
