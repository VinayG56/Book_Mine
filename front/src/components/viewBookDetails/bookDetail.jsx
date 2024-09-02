import React from "react";

const bookDetail = ({ data }) => {
  console.log(data.title);
  return (
    <div className="px-12 py-8 bg-zinc-900 flex gap-8">
      <div className="bg-zinc-800 rounded p-4 h-[88-vh] w-3/6 flex items-center justify-center">
        {/* <img src={data.url} className="h-[70vh]" /> */}
      </div>
      <div className=" p-4 w-3/6">
        {/* <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1> */}
        <p className="text-zinc-400 mt-1"></p>
      </div>
    </div>
  );
};

export default bookDetail;
