const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cimekSchema = new Schema({
  neve: { type: String, required: true },
  ev: { type: Number, min: 2000, max: 2030, default: new Date().getFullYear() },
  megjegyzes: String,
});

const testSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    loginCount: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
    cimek: [cimekSchema],
  },
  { collection: "test", timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
