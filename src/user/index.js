const { Router } = require("express");
const { get, register, login, add } = require("./controller/user"); //getting the functions exported from controller/user.js
const router = Router();
const testMiddleware = require("../../middleware/test");

router.get("/", get);
router.post("/register", register);
router.post("/login", login);
router.post("/addContact", add);

module.exports = router;
