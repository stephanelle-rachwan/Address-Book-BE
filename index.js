require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./src/user");

const DB_CONNECT = process.env.DB_CONNECT || "";
mongoose.connect(DB_CONNECT, () => console.log("connected to db"));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.listen(3000, () => console.log("Server Running"));
