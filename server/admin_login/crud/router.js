const express = require("express");
const { getMethodfun,postMethodfun, loginMethod, verifyToken, forgotPassword, resetPassword  } = require("./crud");

const router = express.Router();

router.get("/readData" ,  getMethodfun);
router.post("/postData" ,postMethodfun); 
router.post("/loginData",verifyToken,  loginMethod);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token",resetPassword );


module.exports = router;





// import express from "express";
// import {
//   getMethodfun,
//   postMethodfun,
//   forgotPassword,
//   loginMethod,  
//   resetPassword,
//   verifyToken
// } from "./crud.js";

// const router = express.Router();

// router.get("/readData", getMethodfun);
// router.post("/postData",  postMethodfun);
// router.post("/loginData", verifyToken,loginMethod);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);


// export default router;
