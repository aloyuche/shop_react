const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cartRoutes = require("./routes/cartRoutes");
const prodRoutes = require("./routes/prodRoutes");

mongoose.connect("mongodb://localhost:27017/shopping");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("register");
});

app.use("/product", prodRoutes);
app.use("/cart", cartRoutes);

app.post("/product", (req, res) => {
  res.json();
});

const port = 5300;

app.listen(port, console.log(`Server is on port ${port}`));
