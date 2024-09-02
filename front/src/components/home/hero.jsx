import React from "react";
import { Link } from "react-router-dom";
const hero = () => {
  return (
    <div className="md:h-[75vh] flex flex-col md:flex-row items-center justify-center gap-2">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-black text-center lg:text-left ">
          Escape reality, <br /><h1 className="leading-normal">Dive into a book.📖</h1>
          
        </h1>
        <p className="mt-4 text-xl text-black text-center lg:text-left">
        Unlocking the doors to endless knowledge, our library is your gateway <br /> to a world of discovery and innovation.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-black text-xl lg:text-2xl font-semibold border border-black border-solid px-10 py-3 hover:bg-zinc-800 hover:text-white rounded-full "
          >
            Dive In
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img className="rounded-full " src="./student.jpg" alt="student" />
      </div>
    </div>
  );
};

export default hero;
