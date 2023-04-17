const express = require("express");

const authRouter = express.Router();

const isAuth = require("../middleware/isAuth");

authRouter.post("/auth", isAuth, async (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = authRouter;
