import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-between h-auto lg:h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} alt="" className="h-[14vh] border-black" />
        <p className="mt-3 text-xl text-black font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-800">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-black font-semibold w-full py-2 text-center hover:bg-zinc-600 hover:text-white rounded-xl transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-600 hover:text-white rounded-xl transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-600 hover:text-white rounded-xl transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-black font-semibold w-full py-2 text-center hover:bg-zinc-600 hover:text-white rounded-xl transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-600 hover:text-white rounded-xl transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="bg-white text-red-400 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold  flex items-center justify-center py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          navigate("/");
        }}
      >
        Log Out <LuLogOut className="ms-4" />
      </button>
    </div>
  );
};

export default sidebar;
