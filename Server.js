const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

// import the user model

const User = require("./models/User");

// load env virables
dotenv.config({ path: "./config/.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// connect to the mongo db

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err.message));

//   routes

// get
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// put

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete

app.delete("/users/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ deleteUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
