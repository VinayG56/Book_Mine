import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../bookCard/bookCard";
import Loader from "../loader/loader";

const recentBooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/get-recent-books");
      setData(res.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-black">
        🆕 Recently Added books</h4>
      {!data && (
        <div className="flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data &&
          data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default recentBooks;
