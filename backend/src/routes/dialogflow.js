const express = require("express");

const dialogflowRouter = express.Router();

dialogflowRouter.post("/dialogflow", async (req, res) => {
  const languageCode = req.body.languageCode;
  const queryText = req.body.queryText;
  const sessionId = req.body.sessionId;

  const text = await detectIntent(languageCode, queryText, sessionId);

  console.log(text);

  res.json({ data: text });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}.`);
});

module.exports = dialogflowRouter;
