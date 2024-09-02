import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const bookCard = ({ data, favourite }) => {
  // console.log(data);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/remove-book-fav",
      {},
      { headers }
    );
    alert(res.data.message);
  };
  return (
    <div className="container">
      <div className="bg-zinc-700 rounded-xl p-4 flex flex-col hover:scale-105 transition-all transform:30s">
        <Link to={`/view-book-details/${data._id}`}>
        <div className="front">
          <div className="bg-gray-300 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          
          <h2 className="mt-4 text-xl text-white font-mono">{data.title}</h2>
          <p className="mt-2 text-zinc-300 font-mono hover:text-yellow-400">by {data.author}</p>
          <p className="mt-2 text-xl text-zinc-200 font-mono"> {data.bookId}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-gray-500 px-4 py2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
      </div>
    </div>
  );
};

export default bookCard;
