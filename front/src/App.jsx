import React, { useEffect } from "react";
import Home from "./pages/home";
import AllBooks from "./pages/allBooks";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import Favourites from "./components/profile/favourites";
import AllOrders from "./pages/allOrders";
import AddBook from "./pages/addBook";
import UpdateBook from "./pages/updateBook";
import UserOrderHistory from "./components/profile/userOrderHistory";
import Settings from "./components/profile/settings";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import ViewBookDetails from "./components/viewBookDetails/viewBookDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}

          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
      {/* </Router> */}
    </div>
  );
};

export default App;
