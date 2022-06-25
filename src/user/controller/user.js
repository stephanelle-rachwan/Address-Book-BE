const User = require("../../../model/User");
const { getUsers, getById } = require("../service");

async function get(req, res) {
  try {
    if (req.query.id) {
      // a get API to find all the users/contacts by id
      const id = req.query.id; //when do we use thiss
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

// exporting my functions
module.exports = {
  get,
};
