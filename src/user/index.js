const { Router } = require("express");
const {
  get,
  register,
  login,
  add,
  updateContact,
  removeContact,
} = require("./controller/user"); //getting the functions exported from controller/user.js
const router = Router();
const testMiddleware = require("../../middleware/test");

router.post("/", testMiddleware(), get);
router.post("/register", register);
router.post("/login", login);
router.post("/addContact", add);
router.post("/update", updateContact);
router.delete("/", removeContact);

module.exports = router;
