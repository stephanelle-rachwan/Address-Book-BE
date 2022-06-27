const User = require("../../model/User");
const Contact = require("../../model/Contact");

// splitting the functions
async function getUsers() {
  // return await User.find();
  return await User.find().populate("contacts");
}

async function getById(id) {
  return await User.findById(id).populate("contacts");
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

async function getByEmail(email) {
  return await User.findOne({
    email,
  });
}

async function addContact(body) {
  const {
    fullName,
    phoneNumber,
    relationStatus,
    email,
    user,
    longitude,
    latitude,
  } = body;

  const contact = new Contact({
    fullName,
    phoneNumber,
    relationStatus,
    email,
    user,
    longitude,
    latitude,
  });

  return await contact.save();
}
async function getContactByPhone(number) {
  return await Contact.find({ phoneNumber: number });
}
module.exports = {
  getUsers,
  getById,
  getContactByPhone,
  addUser,
  getByEmail,
  addContact,
};
