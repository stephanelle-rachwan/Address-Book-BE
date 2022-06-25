const User = require("../../model/User");

// splitting the functions
async function getUsers() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function addUser(body, hashPassword) {
  const {
    //deconstructing name and email from body
    name,
    email,
  } = body;

  const user = new User({
    //creating a new user
    name,
    email,
    password: hashPassword,
  });

  return await user.save();
}

module.exports = {
  getUsers,
  getById,
  addUser,
};
