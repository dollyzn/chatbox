const express = require("express");
const dialogflow = require("@google-cloud/dialogflow");

if (
  !process.env.DIALOGFLOW_PROJECT_ID ||
  !process.env.DIALOGFLOW_PRIVATE_KEY ||
  !process.env.DIALOGFLOW_CLIENT_EMAIL
)
  throw "Please, configure credentials in the env variables";

const projectId = process.env.DIALOGFLOW_PROJECT_ID;

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const sessionClient = new dialogflow.SessionsClient(config);

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  return {
    response: result.fulfillmentText,
  };
};

const dialogflowRouter = express.Router();

dialogflowRouter.post("/dialogflow", async (req, res) => {
  const { languageCode, queryText, sessionId } = req.body;

  try {
    const message = await detectIntent(languageCode, queryText, sessionId);

    return res.status(200).json({ data: message });
  } catch (err) {
    return res
      .status(500)
      .send({ erro: "Ocorreu um erro ao processar a requisição." });
  }
});

module.exports = dialogflowRouter;
