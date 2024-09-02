import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/loader";
import BookCard from "../components/bookCard/bookCard";
const allBooks = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/get-all-books");
      setData(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-gradient-to-r from-gray-200 via-gray-50 to-gray-150 h-auto px-12 py-8">
      {" "}
      {!data && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div>
        <form class="max-w-md mx-auto ">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </form>

        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {/* {data &&
            data.map((items, i) => (
              <div key={i}>
                <BookCard data={items} />{" "}
              </div>
            ))} */}
          {data &&
            data
              .filter((items) => {
                return search.toLowerCase === ""
                  ? items
                  : items.title.toLowerCase().includes(search) ||
                      items.author.toLowerCase().includes(search);
              })
              .map((items) => (
                <div key={items.id}>
                  <BookCard data={items} />{" "}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default allBooks;
