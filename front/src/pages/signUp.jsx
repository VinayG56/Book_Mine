import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const signUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("all fields are required");
      } else {
        // console.log(Values);
        const res = await axios.post(
          "http://localhost:1000/api/v1/sign-up",
          Values
        );
        alert(res.data.message);
        navigate("/logIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-auto bg-gray-200 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-300 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-black text-3xl font-semibold flex justify-center">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-700 text-lg">
              {" "}
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-xl text-zinc-700 p-2 outline-none rounded-lg"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700 text-lg">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-xl text-zinc-700 p-2 outline-none rounded-lg"
              placeholder="abc@example.in"
              name="email"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700 text-lg">
              Password
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-xl text-zinc-700 p-2 outline-none rounded-lg "
              placeholder="****"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700 text-lg">
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-white text-xl text-zinc-700 p-2 outline-none rounded-lg"
              name="address"
              rows="5"
              placeholder="your address"
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-center ">
            <button
              className="w-64 bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={submit}
            >
              {/* {" "} */}
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-black font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-black font-semibold">
            Already have an account? &nbsp;
            <Link to="/logIn" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signUp;
