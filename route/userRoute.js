const express = require("express"),
  router = express.Router(),
  User = require("../model/userModel"),
  Joi = require("@hapi/joi");

//----------------------------------------------------
//  Userek listázás
//----------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/import", async (req, res) => {
  const adat = [
    {
      userName: "Józsi",
      password: "123456",
      cimek: [
        { neve: "országos bajnok", ev: 2005 },
        { neve: "minősítés", ev: 2018 },
      ],
    },
    {
      userName: "Pali",
      password: "456789",
      cimek: [{ neve: "KGY ezüst minősítés", ev: 2017 }],
    },
  ];
  try {
    const e = await User.insertMany(adat);
    res.json(e);
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
//  adott ID -jű user adatai
//----------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    //const user = await User.findOne({ _id: req.params.id });
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
//  adott ID -jű user törlése
//----------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
// user add
//----------------------------------------------------
router.post("/", async (req, res) => {
  // validálás -----------------------------
  //console.log(req);

  const sch = Joi.object({
    userName: Joi.string().min(1).required(),
    password: Joi.string().min(3).required(),
  });
  try {
    const value = await sch.validateAsync(req.body);

    var user = await User.findOne({ userName: value.userName });
    if (!user) {
      user = await new User(value).save();
      // user = await user.save();

      res.json(user);
    } else res.status(404).send("Ez a user már szerepel a nyilvántartásban!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
// cimke add
//----------------------------------------------------
router.post("/cimke/:id", async (req, res) => {
  // validálás -----------------------------
  //console.log(req);

  const sch = Joi.object({
    neve: Joi.string().min(1).required(),
    ev: Joi.number().min(2000).max(2030),
    megjegyzes: Joi.string(),
  });
  try {
    const value = await sch.validateAsync(req.body);
    let user = await User.findById(req.params.id);
    if (user) {
      user.cimek.push(value);
      user = await user.save();
      res.json(user);
    } else res.status(404).send("Nem találom ezt a user-t");
  } catch (err) {
    res.status(500).send(err);
  }
});

//----------------------------------------------------
// user login
//----------------------------------------------------
router.post("/login", async (req, res) => {
  // validálás -----------------------------
  //console.log(req);

  const sch = Joi.object({
    userName: Joi.string().min(1).required(),
    password: Joi.string().min(3).required(),
  });
  try {
    const value = await sch.validateAsync(req.body);
    var user = await User.findOne({ userName: value.userName });

    if (user) {
      if (value.password === user.password) {
        // utolsó belépés beírása -------------------
        await User.findByIdAndUpdate(user._id, {
          $inc: { loginCount: 1 },
          $set: {
            lastLogin: Date.now(),
            updateAt: user.updateAt,
          },
        });
        // token generálás ----------------
        //
        //user = await new User(value);
        //user = await user.save();

        //--------- visszadjuk a teljes profilt -------------
        res.json(user);
      } else res.status(404).send("Helytelen a megadott jelszó!");
    } else res.status(404).send("Nem található a user!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
