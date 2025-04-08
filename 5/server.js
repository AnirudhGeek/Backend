require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database/db");
const authRoutes = require("./routes/auth-routes");

const app = express();
const PORT = process.env.PORT || 3000;

//connnection to database
connectToDatabase();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => [console.log(`Server started at port : ${PORT}`)]);
