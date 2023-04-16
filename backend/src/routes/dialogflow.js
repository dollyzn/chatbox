const express = require("express");
const dialogflow = require("@google-cloud/dialogflow");
const serviceAccount = require(`${process.env.DIALOGFLOW_CREDENTIALS_FILE_PATH}`);

if (
  !serviceAccount.project_id ||
  !serviceAccount.private_key ||
  !serviceAccount.client_email
)
  throw "Please, verify your service account path in .env or service account file format";

const projectId = serviceAccount.project_id;

const config = {
  credentials: {
    private_key: serviceAccount.private_key,
    client_email: serviceAccount.client_email,
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
      .json({ erro: "Ocorreu um erro ao processar a requisição." });
  }
});

module.exports = dialogflowRouter;
