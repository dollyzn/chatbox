const express = require("express");

const chatgptRouter = require("./chatgpt");
const dialogflowRouter = require("./dialogflow");
const authRouter = require("./auth");

const routes = express.Router();

routes.use(authRouter);
routes.use(chatgptRouter);
routes.use(dialogflowRouter);

module.exports = routes;
