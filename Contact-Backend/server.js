const express = require("express");

const route = require("./routes/contactRoutes");
const rout = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", route);
app.use('/api/users', rout)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Ther Server is Running on port ${port}`);
});
