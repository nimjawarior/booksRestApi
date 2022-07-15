const express = require("express");
const router = express.Router();
const Book = require("../models/books");
const { validateBook } = require("../models/books");

/*Alternative to this function
router.get("/:bookId", (req, res) => {
  Book.findById(req.params.bookId)
    .then((book) => {
      if (book) res.send(book);
      res.status(404).send("Book not found");
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});
*/
//POST: Create a new book
router.post("/", async (req, res) => {
  const error = await validateBook(req.body);
  if (error.message) res.status(400).send(error.message);
  book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });
  book
    .save()
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(500).send("Book was not stored in db");
    });
});

//Get ALL
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});
router.get("/:bookId", async (req, res) => {
  const book = Book.findById(req.params.bookId);
  if (!book) res.status(404).send("Book not found");
  res.send(book);
});

router.post("/:bookId", async (req, res) => {
  const updatedBook = await findByIdAndUpdate(
    req.params.bookId,
    {
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    },
    { new: true }
  );
  if (!updatedBook) res.status(404).send("Book not found");
  res.send(updatedBook);
});

router.delete("/:bookId", async (req, res) => {
  const book = Book.findByIdAndRemove(req.params.bookId);
  if (!book) res.status(404).send("Book with id not found");
  res.send(book);
});

module.exports = router;

/// https://www.youtube.com/watch?v=lUEtzFsicJY&ab_channel=vishalmarhatta
// TIME 56.03
