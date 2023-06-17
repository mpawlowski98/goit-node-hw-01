//Routes

const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Incorrect login/password",
      message: "User already exists!",
    });
  }

  const payload = {
    id: user.id,
  };
  const secret = "tojestsecret";
  const token = jwt.sign(payload, secret);
  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "error",
      code: 409,
      data: `Conflict`,
      message: "User lipton",
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.json({
      status: "success",
      code: 201,
      data: {
        message: "Register complete!",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/tasks", async (req, res, next) => {
  const dogs = await Dog.find();
  res.json({
    status: `success`,
    code: 200,
    data: {
      dogs,
    },
  });
});

module.exports = routerl;
