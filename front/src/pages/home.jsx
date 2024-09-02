import React from "react";
import Hero from "../components/home/hero";
import RecentBooks from "../components/home/recentBooks";

const home = () => {
  return (
    <div className="bg-zinc-300 text-white px-10 py-8">
      <Hero />
      <RecentBooks />
    </div>
  );
};

export default home;
