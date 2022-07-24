const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://anastasiaDom21:anadom21@cluster0.nxxmirr.mongodb.net/formDB",
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  () => {
    console.log("connected to mdb");
  }
);

const notesSchema = {
  name: String,
  password: String,
  email: String,
  phone: Number,
};

const Note = mongoose.model("Note", notesSchema);

const path = require("path");
const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

const viewsPath = path.join(__dirname, "/templates/views");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/formget", (req, res) => {
  console.log(req.query);
  res.render("formGet");
});

app.get("/formpost", (req, res) => {
  res.render("formPost");
});

app.post("/formpost", (req, res) => {
  console.log(req.body);
  let newNote = new Note({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
  });
  newNote.save();
  res.redirect("formPost");
});

app.get("*", (req, res) => {
  res.render("404");
});

//--- Redirect to home page ---

// app.get("*", (req, res) => {
//   res.redirect(303,'/');
// });

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});
