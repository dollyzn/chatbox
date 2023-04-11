const express = require("express");

const chatgptRouter = require("./chatgpt");
const dialogflowRouter = require("./dialogflow");

const routes = express.Router();

routes.use(chatgptRouter);
routes.use(dialogflowRouter);

module.exports = routes;
