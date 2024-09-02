import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const logIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("all fields are required");
      } else {
        // console.log(Values);
        const res = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(res.data.role));
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        console.log(res.data);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[88vh] bg-gray-200 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-300 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-black text-3xl font-semibold flex justify-center">Log In</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-700 text-lg">
              {" "}
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-zinc-700 text-xl p-2 outline-none rounded-lg"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700 text-lg">
              Password
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-xl text-zinc-700 p-2 outline-none rounded-lg"
              placeholder="****"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-center ">
            <button
              className="w-60  bg-blue-500 text-white font-semibold text-xl py-2 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={submit}
            >
              {" "}
              LogIn
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-black font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-black font-semibold">
            Don't have an account? &nbsp;
            <Link to="/SignUp" className="hover:text-blue-500">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default logIn;
