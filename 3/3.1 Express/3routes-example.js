const express = require("express");
const app = express();

const PORT = 3000;

//root route
app.get("/", (req, res) => {
  res.send("Welcome to our homepage");
});

//route to get all products
app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];

  res.json(products);
});

//to get a single product
// eg. product/2
app.get("/products/:id", (req, res) => {
  //by putting collon in front of id makes it a dynamic route and it is compulsory to put collons in front of dynamic route
  const productId = parseInt(req.params.id);
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];
  const getSingleProduct = products.find(product=>productId === product.id)
  if(getSingleProduct){
    res.json(getSingleProduct)
  }else{
    res.status(404).send("Product not found")
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
