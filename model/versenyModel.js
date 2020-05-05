const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const versenySchema = new Schema(
  {
    versenyName: { type: String, required: true },
    startDate: { type: Date, required: true },
    helyszín: { type: String },
    tipus: {
      type: String,
      enum: ["Pályaverseny", "3D", "Történelmi", "Örömíjász"],
    },
  },
  { collection: "verseny" }
);

module.exports = mongoose.model("Verseny", versenySchema);
