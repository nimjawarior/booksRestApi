const mongoose = require("mongoose");
const Author = require("./author");
const yup = require("yup");
//Book SCHEMA
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  author: Author.schema,
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const validateBook = (books) => {
  const schema = yup.object().shape({
    bookname: yup.string().required().min(3).max(50),
    authorName: yup.string().required().min(3).max(40),
    authorAge: yup.number().required().min(10).max(100),
    genre: yup.string().required().min(3).max(20),
  });
  return schema
    .validate(book)
    .then((book) => book)
    .catch((error) => console.log(error));
};

//Default export
module.exports = new mongoose.model("Book", BookSchema);

//Named export

exports.validateBook = validateBook;
