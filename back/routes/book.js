const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

//add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "You don't have access to admin panel" });
    }
    // const { title } = req.body;
    // const existBook = await Book.findOne({ title: title });
    // if (existBook) {
    //   return res.status(400).json({ message: "Book exists" });
    // }
    const newBook = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      bookId: req.body.bookId,
      desc: req.body.desc,
      language: req.body.language,
    });
    await newBook.save();
    res
      .status(200)
      .json({ message: "Book added successfully", bookId: newBook._id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    // const { title } = req.body;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      bookId: req.body.bookId,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({ message: "Book Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const book = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get recently added books (upto 4 books only)
router.get("/get-recent-books", async (req, res) => {
  try {
    const book = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
