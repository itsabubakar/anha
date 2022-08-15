const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.DB_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

connect();

const anhaSchema = {
  fullName: String,
  address: String,
  state: String,
  phone: String,
  email: String,
  maritalStatus: String,
  profession: String,
  nationality: String,
  referredBy: String,
  identification: String,
  membershipType: String,
  reasonForJoin: String,
  farm: String,
};

const Anha = mongoose.model("Note", anhaSchema);

app.get("/healthCheck", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/join-us", async (req, res) => {
  let newAnha = new Anha(req.body);
  try {
    await newAnha.save();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: err.message, status: "failed to save note" });
  }
  res.status(201).json(newAnha);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("server started on " + port + "...");
});
