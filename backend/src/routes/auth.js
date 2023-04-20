const express = require("express");
const admin = require("firebase-admin");

const authRouter = express.Router();

const isAuth = require("../middleware/isAuth");

authRouter.post("/auth", isAuth, async (req, res) => {
  try {
    const customToken = await admin.auth().createCustomToken(req.user.uid);

    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Internal server error" });
  }
});

module.exports = authRouter;
