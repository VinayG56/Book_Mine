const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//put book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookCart = userData.cart.includes(bookid);
    if (isBookCart) {
      return res.json({ status: "Success", message: "Already in Cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.json({ status: "Success", message: "Added to Cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//remove from cart
router.put("/remove-book-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    const userData = await User.findById(id);
    const isBookCart = userData.cart.includes(bookid);
    if (isBookCart) {
      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    }
    return res.json({ status: "Success", message: "Removed from Cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//get cart of user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart"); //if populate is not used then only bookid will be displayed.
    const cart = userData.cart.reverse();
    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
