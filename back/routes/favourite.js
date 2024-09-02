const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to favourites
router.put("/add-book-fav", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      return res.status(200).json({ message: "Already in Favs" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Added to Favs" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete book from favourites
router.put("/remove-book-fav", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }
    return res.status(200).json({ message: "Removed from Favs" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get fav of user
router.get("/get-fav-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites"); //if populate is not used then only bookid will be displayed.
    const favBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
