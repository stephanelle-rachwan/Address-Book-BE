const User = require("../../model/User");

// splitting the functions
async function getUsers() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

module.exports = {
  getUsers,
  getById,
};
