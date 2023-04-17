const admin = require("firebase-admin");
const CryptoJS = require("crypto-js");

const serviceAccount = require(`${process.env.FIREBASE_CREDENTIALS_FILE_PATH}`);
const cryptoKey = process.env.CRYPTO_KEY;

if (!process.env.FIREBASE_CREDENTIALS_FILE_PATH) {
  throw "Please, verify your service account path in .env or service account file format";
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const isAuth = async (req, res, next) => {
  const encryptedCookie = req.cookies.user;

  try {
    const decryptedUserJSON = CryptoJS.AES.decrypt(
      encryptedCookie,
      cryptoKey
    ).toString(CryptoJS.enc.Utf8);

    const user = JSON.parse(decryptedUserJSON);

    const decodedToken = await admin.auth().verifyIdToken(user.token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};

module.exports = isAuth;
