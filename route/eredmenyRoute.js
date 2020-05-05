const express = require("express"),
  router = express.Router(),
  Eredmeny = require("../model/eredmenyModel"),
  Joi = require("@hapi/joi");

//----------------------------------------------------
//  Eredmenyek listázás
//----------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const user = await Eredmeny.find()
      .populate({
        path: "verseny",
        options: { sort: "-startDate" },
      })
      .populate("user")
      .sort({ kategoria: 1, korosztaly: 1, gender: 1 });
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
    const user = await Eredmeny.find({ verseny: req.params.id }).populate(
      "Verseny"
    );
    //const user = await Eredmeny.findById(req.params.id);
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
    const user = await Eredmeny.findByIdAndDelete(req.params.id);
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

    user = await new Eredmeny(req.body);
    user = await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
