const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cimekSchema = new Schema({
  neve: { type: String, required: true },
  ev: { type: Number, min: 2000, max: 2030, default: new Date().getFullYear() },
  megjegyzes: String,
});

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: String,
    loginCount: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
    cimek: [cimekSchema],
  },
  { collection: "user", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
