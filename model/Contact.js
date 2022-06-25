const mongoose = require("mongoose");

// const pointSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ["Point"],
//     required: true,
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//   },
// });

// const locationSchema = new mongoose.Schema({
//   name: String,
//   location: {
//     type: pointSchema,
//     required: true,
//   },
// });

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phoneNumber: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  relationStatus: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  longitude: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
  latitude: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
