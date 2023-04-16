const admin = require("firebase-admin");

const serviceAccount = require(`${process.env.FIREBASE_CREDENTIALS_FILE_PATH}`);

if (!process.env.FIREBASE_CREDENTIALS_FILE_PATH) {
  throw "Please, verify your service account path in .env or service account file format";
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const isAuth = async (req, res, next) => {
  const token = req.body.token;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};

module.exports = isAuth;
