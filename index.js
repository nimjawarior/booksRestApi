const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
const booksRoute = require("./routes/books");

const PORT = process.env.PORT || 3000;

//MiddleWear
app.use(express.json()); // you can expect that we send JSON in the url
app.use(express.urlencoded({ extended: true })); //We can also expect to send object, array, array of objects

//routes
app.use("/api/books", booksRoute);
//Connect to mongodb atlas
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb atlas");
  })
  .catch((error) => {
    console.log("Something wrong happened.", error);
  });

//start server
app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});
