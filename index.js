const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
const booksRoute = require("./routes/books");
const winston = require("winston");

const PORT = process.env.PORT || 3000;

//MiddleWear
app.use(express.json()); // you can expect that we send JSON in the url
app.use(express.urlencoded({ extended: true })); //We can also expect to send object, array, array of objects

//Create a longer
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

//routes
app.use("/api/books", booksRoute);
//Connect to mongodb atlas
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.log("info", "Connected to mongodb atlas");
    //console.log("Connected to mongodb atlas");
  })
  .catch((error) => {
    logger.log("error", error.message);
    // console.log("Something wrong happened.", error);
  });

//start server
app.listen(PORT, () => {
  // console.log("Server started at PORT ", PORT);
  logger.log("info", "Server started at PORT " + PORT);
});
