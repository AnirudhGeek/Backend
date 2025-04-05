// what is Middleware?
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

// Middleware functions can perform the following tasks:
// => Execute any code.
// => Make changes to the request and the response objects.
// => End the request-response cycle.
// => Call the next middleware function in the stack.

const express = require("express");
const app = express();

//difining of middleware functions
const myFirstMiddleware = (req, res, next) => {
  console.log(`This first middlware will run on every requset`);
  next();
};

app.use(myFirstMiddleware)

app.get('/',(req,res)=>{
    res.send("Home page")
})

app.get('/about',(req,res)=>{
    res.send("About page")
})

app.listen(3000,()=>{
    console.log(`Server is now running on the port : 3000`)
})