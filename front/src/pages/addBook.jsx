import React, { useState } from "react";
import axios from "axios";

const addBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    bookId: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.bookId === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("all fields are required");
      } else {
        const res = await axios.post(
          "http://localhost:1000/api/v1/add-book",
          data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          bookId: "",
          desc: "",
          language: "",
        });
        alert(res.data.message);
      }
    } catch (e) {
    //   alert(e.response.data.message);
    }
  };
  return (
    <div className="bg-white h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of the book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of image"
            name="title"
            required
            value={data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of the book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of image"
            name="author"
            required
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 ">
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language"
              name="language"
              required
              value={data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Book ID
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="book id"
              name="bookId"
              required
              value={data.bookId}
              onChange={change}
            />
          </div>
        </div>
          {/* <label htmlFor="" className="text-zinc-400">
                language
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="language"
                name="language"
                required
                value={data.language}
                onChange={change}
              /> */}
          {/* <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              price
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="price"
              name="price"
              required
              value={data.price}
              onChange={change}
            />
          </div> */}
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description
          </label>
          <textarea
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="desc"
            name="desc"
            rows="4"
            required
            value={data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          {" "}
          Add Book
        </button>
      </div>
    </div>
  );
};

export default addBook;
