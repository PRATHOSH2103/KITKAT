const express = require("express");
const { getMethodfun,postMethodfun,  forgotPassword, saveForgotEmail, loginMethod, Resetpassword, verifyToken    } = require("./crud");

const router = express.Router();

router.get("/readData" ,  getMethodfun);
router.post("/postData" , postMethodfun); 
router.post("/loginData",verifyToken, loginMethod);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", Resetpassword);
router.post("/ForgotEmail", saveForgotEmail);
module.exports = router;


