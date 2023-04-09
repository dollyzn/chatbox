const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(routes);

app.use(async (req, res, _) => {
  return res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
