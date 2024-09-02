import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/sidebar";
import MobileNav from "../components/profile/mobileNav";
import { useSelector } from "react-redux";
import Loader from "../components/loader/loader";
import axios from "axios";

const profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-info",
        { headers }
      );
      // console.log(res.data);
      setProfile(res.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-gray-200  px-2 md:px-12 flex flex-col md:flex-row  py-8 text-white">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen px-3">
            <Sidebar data={profile} />
            <MobileNav data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            {/* jh */}
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default profile;
