import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../bookCard/bookCard";

const favourites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [favBooks, setFavBooks] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-fav-books",
        { headers }
      );
      setFavBooks(res.data.data);
    };
    fetch();
  }, [favBooks]);
  return (
    <>
      {favBooks && favBooks.length===0 &&(
        <div className="text-5xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center w-full">
          NO Favourite Books
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {favBooks &&
          favBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default favourites;
