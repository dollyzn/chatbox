import { Router } from "express";

import chatgptRouter from "./chatgpt";
import dialogflowRouter from "./dialogflow";

const routes = Router();

routes.use(chatgptRouter);
routes.use(dialogflowRouter);

export default routes;
