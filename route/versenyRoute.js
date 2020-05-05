const express = require("express"),
  router = express.Router(),
  Verseny = require("../model/versenyModel"),
  Joi = require("@hapi/joi");

//----------------------------------------------------
//  Versenyek listázás
//----------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const user = await Verseny.find();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
//  adott ID -jű verseny adatai
//----------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    //const user = await Verseny.findOne({ _id: req.params.id });
    const user = await Verseny.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
//  adott ID -jű verseny törlése
//----------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const user = await Verseny.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
// verseny add
//----------------------------------------------------
router.post("/", async (req, res) => {
  // validálás -----------------------------

  try {
    //const value = await sch.validateAsync(req.body);

    user = await new Verseny(req.body);
    user = await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
