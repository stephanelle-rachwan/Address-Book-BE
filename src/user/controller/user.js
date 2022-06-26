const User = require("../../../model/User");
const Contact = require("../../../model/Contact");

const {
  getUsers,
  getById,
  addUser,
  getByEmail,
  addContact,
} = require("../service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

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
    console.log("addUserResult => ", addUserResult);
    // return res.send(result);
    return res.send({ user: addUserResult._id });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

async function login(req, res) {
  try {
    // in case email not found
    const user = await getByEmail(req.body.email);
    if (!user) return res.status(400).send("invalid credentials");

    // in case email available but password doesn't match
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("invalid credentials");

    // when defining a token, it needs to have a secret.
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      TOKEN_SECRET
    );

    return res.header("auth-token", token).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// adding a new contact to the user
async function add(req, res) {
  try {
    console.log(req.body);

    const newContact = await addContact(req.body);
    console.log("newContact =>", newContact);

    const updateUser = await User.updateOne(
      {
        _id: newContact.user,
      },
      {
        $push: {
          contacts: newContact._id,
        },
      }
    );
    console.log("updateUser =>", updateUser);

    return res.status(200).send(newContact); // 200
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// updating an existing contact
async function updateContact(req, res) {
  try {
    const contact = await Contact.updateOne({
      $set: {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        relationStatus: req.body.relationStatus,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        user: req.body.user,
      },
    });
    return res.send(contact);
  } catch (error) {
    console.log(error);
  }
}

// deleting an existing contact
async function removeContact(req, res) {
  try {
    curr_id = req.query.id;
    const contact = await Contact.findOne({ curr_id });
    // if (!contact) console.log(404);
    const deleteResult = await contact.remove();

    await User.updateMany(
      { _id: contact.user },
      { $pull: { contacts: contact._id } }
    );

    return res.send("contact removed");
  } catch (error) {
    console.log(error);
  }
}

// exporting my functions
module.exports = {
  get,
  register,
  login,
  add,
  updateContact,
  removeContact,
};
