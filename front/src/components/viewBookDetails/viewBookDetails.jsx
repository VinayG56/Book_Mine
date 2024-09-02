import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const viewBookDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [desc, setDesc] = useState();
  const [bookId, setBookid] = useState();
  const [lang, setLang] = useState();
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn, role);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      console.log(res.data.data.bookId);
      setData(res.data.data);
      setUrl(res.data.data.url);
      setTitle(res.data.data.title);
      setAuthor(res.data.data.author);
      setDesc(res.data.data.desc);
      setBookid(res.data.data.bookId);
      setLang(res.data.data.language);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFav = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/add-book-fav",
      {},
      { headers }
    );
    alert(res.data.message);
  };
  const handleCart = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(res.data.message);
  };
  const deleteBook = async () => {
    const res = await axios.delete("http://localhost:1000/api/v1/delete-book", {
      headers,
    });
    alert(res.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {data && (
        <div className=" px-4 md:px-12 py-8 bg-white flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6  ">
            <div className="bg-gradient-to-r from-gray-300 via-gray-50 to-gray-200 flex flex-col lg:flex-row p-12 justify-around rounded">
              {" "}
              <img
                src={url}
                alt="/"
                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500"
                    onClick={handleFav}
                  >
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </button>
                  <button
                    className="text-white rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-blue-600 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaCartShopping />
                    <span className="ms-4 block lg:hidden">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white rounded-full text-3xl p-3"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="text-red-500 rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center"
                    onClick={deleteBook}
                  >
                    <MdDelete />
                    <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-black font-mono">{title}</h1>
            <p className="text-orange-600 mt-1">by {author}</p>
            <p className="text-gray-900 mt-4 text-xl">{desc}</p>
            <p className="flex mt-4 items-center justify-start text-gray-800">
              <GrLanguage className="me-3" />
              {lang}
            </p>
            <p className="mt-4 text-black text-3xl font-semibold">
              Book Id : {bookId}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default viewBookDetails;
