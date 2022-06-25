const User = require("../../../model/User");

async function get(req, res) {
  try {
    const result = await User.find();
    console.log("result =>", result);
  } catch (error) {
    console.log(error);
  }
}

// exporting my functions
module.exports = {
  get,
};
