const express = require("express");
const dialogflow = require("@google-cloud/dialogflow");

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

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
  const languageCode = req.body.languageCode;
  const queryText = req.body.queryText;
  const sessionId = req.body.sessionId;

  const text = await detectIntent(languageCode, queryText, sessionId);

  console.log(text);

  return res.status(200).json({ data: text });
});

module.exports = dialogflowRouter;
