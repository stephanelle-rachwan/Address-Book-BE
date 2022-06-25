const User = require("../../../model/User");
const { getUsers, getById, addUser } = require("../service");
const bcrypt = require("bcryptjs");

async function get(req, res) {
  try {
    if (req.body.id) {
      // a get API to find all the users/contacts by id
      const id = req.body.id; //when do we use thiss
      const result = await getById(id);
      console.log("result of specific user => ", result);
      return res.send(result);
    }

    // a get API to find all the users/contacts
    const result = await getUsers();
    console.log("result =>", result);

    return res.send(result); // so the results show on the postman/frontend
  } catch (error) {
    console.log(error);
  }
}

async function register(req, res) {
  try {
    //creating my password hashed
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log(req.body);
    console.log(hashPassword);

    const addUserResult = await addUser(req.body, hashPassword);
    // return res.send(result);
    return res.send({ user: addUserResult._id });
  } catch (error) {
    console.log(error);
  }
}

// exporting my functions
module.exports = {
  get,
  register,
};
