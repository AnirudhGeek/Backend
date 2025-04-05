// Embedded JavaScript(ejs) is a simple tamplating language that lets us generate html markup with plain javascript

//Why it is useful
//beacause it can help you to generate dynamic html pages in express application

const express = require("express");
const path = require("path");

const app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

//set the directory for the views
app.set("views", path.join(__dirname, "views"));

//creating some dummy data
const products = [
  {
    id: 1,
    title: "Product 1",
  },
  {
    id: 2,
    title: "Product 2",
  },
  {
    id: 3,
    title: "Product 3",
  },
];

app.get("/", (req, res) => {
  res.render("home", { title: "Home page", products: products });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page" });
});


const PORT = 3000
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))