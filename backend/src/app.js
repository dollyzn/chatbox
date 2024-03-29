const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(routes);

app.use(async (req, res, _) => {
  return res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
