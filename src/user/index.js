const { Router } = require("express");
const { get } = require("./controller/user"); //getting the functions exported from controller/user.js
const router = Router();

router.get("/", get);

module.exports = router;
