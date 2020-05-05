const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eredmenySchema = new Schema(
  {
    name: { type: String, required: true },
    egyesulet: String,
    kategoria: { type: String, required: true, enum: ["PBHB", "BB", "TR"] },
    gender: { type: Number, required: true, enum: [0, 1] },
    korosztaly: { type: Number, min: 0, max: 10 },
    pontszam: { type: Number, min: 0 },
    teljesitmeny: Number,
    verseny: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Verseny",
      required: true,
    },
    versenyzo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "eredmeny" }
);

module.exports = mongoose.model("Eredmeny", eredmenySchema);
