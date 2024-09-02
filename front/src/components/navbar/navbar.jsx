import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import '../styles/navbar.css'

const navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    // {
    //   title: "About Us",
    //   link: "/about-us",
    // },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  // if (isLoggedIn === true && role === "admin") {
  //   links.splice(2, 1);
  // }
  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  const [MbNav, setMbNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 bg-gradient-to-r from-red-200 via-blue-200 to-green-200 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center ">
          <img
            className="h-10 m-4"
            src="https://cdn-icons-png.flaticon.com/512/9043/9043296.png"
            alt="logo"
          />
          <h1 className="text-2xl text-black font-semibold font-serif">BookMine</h1>
        </Link>
        <div className="nav-links-bookheavenn block md:flex items-center gap-4 ">
          <div className="hidden md:flex gap-4 font-sans">
            {links.map((items, i) => (
              <div className="flex items-center justify-center">
                {items.title === "Profile" ||
                items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 text-black text-lg font-semibold border border-blue-500 text-black rounded hover:bg-black hover:text-white hover:rounded-full link-hover-logo transition-all duration-10s"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className=" text-black text-lg font-semibold hover:text-red-500 hover:text-lg transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/logIn"
                className="px-4 py-1 border border-blue-500  font-semibold text-black rounded hover:bg-black hover:text-white hover:rounded-full transition-all duration-500"
              >
                Log In
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 font-semibold text-black rounded hover:bg-black hover:text-white hover:rounded-full transition-all duration-500"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MbNav === "hidden" ? setMbNav("block") : setMbNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MbNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${MbNav}text-white text-4xl mb-8 font-semibold hover:text-yellow-500 transition-all duration-300`}
            onClick={() =>
              MbNav === "hidden" ? setMbNav("block") : setMbNav("hidden")
            }
            key={i}
          >
            {items.title}
          </Link>
        ))}
      </div>
      {isLoggedIn === false && (
        <>
          <Link
            to="/logIn"
            className={`${MbNav} px-8 py-2 text-white text-3xl mb-8 font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            onClick={() =>
              MbNav === "hidden" ? setMbNav("block") : setMbNav("hidden")
            }
          >
            Log In
          </Link>
          <Link
            to="/SignUp"
            className={`${MbNav} px-8 py-2 text-white text-3xl mb-8 font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            onClick={() =>
              MbNav === "hidden" ? setMbNav("block") : setMbNav("hidden")
            }
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
};

export default navbar;
