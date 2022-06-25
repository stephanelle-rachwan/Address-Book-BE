const { Router } = require("express");
const { get, register } = require("./controller/user"); //getting the functions exported from controller/user.js
const router = Router();

router.get("/", get);
router.post("/register", register);

module.exports = router;
