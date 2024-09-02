import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/loader";
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserData from "./userData";
const allOrders = () => {
  const [order, setOrder] = useState();
  const [value, setValue] = useState({ status: "" });
  const [opt, setOpt] = useState(-1);
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
      setOrder(res.data.data);
    };
    fetch();
  }, [order]);
  const change = (e) => {
    const { value } = e.target;
    setValue({ status: value });
  };
  const submitChanges = async (i) => {
    const id = order[i]._id;
    const res = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      value,
      { headers }
    );
    alert(res.data.message);
  };
  const setOption = (i) => {
    setOpt(i);
  };
  order && order.splice(order.length - 1, -1);
  return (
    <>
      {!order && (
        <div className="h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {order && order.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            My Books
          </h1>
          <div className="text-black mt-4 bg-white w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="text-black w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="text-black w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>
            <div className="text-black w-[17%] md:w-[9%]">
              <h1 className="">Book Id</h1>
            </div>
            <div className="text-black w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="text-black w-[10%] md:w-[5%]">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {order &&
            order.map((items, i) => (
              <div className="bg-white w-full text-black rounded py-2 px-4 flex gap-2 hover:bg-gray-400 hover:text-white hover:cursor-pointer transition-all duration-300">
                <div className="w-[3%]">
                  <h1 className="text-black text-center">{i + 1}</h1>
                </div>
                <div className="text-black w-[40%] md:w-[22%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="text-black w-0 md:w-[45%] hidden md:block">
                  <h1 className="">{items.book.desc.slice(0, 50)} ...</h1>
                </div>
                <div className="text-black w-[17%] md:w-[9%]">
                  <h1 className=""> {items.book.bookId}</h1>
                </div>
                <div className="text-black w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button
                      className="s hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        setOption(i);
                      }}
                    >
                      {items.status === "Book Issued" ? (
                        <div className=" text-yellow-400 hover:text-yellow-200">{items.status}</div>
                      ) : items.status === "Book Returned" ? (
                        <div className=" text-red-600 hover:text-yellow-200">{items.status}</div>
                      ) : (
                        <div className=" text-green-600 hover:text-yellow-200">{items.status}</div>
                      )}
                    </button>
                    <div
                      className={`${opt === i ? "block" : "hidden"} flex mt-4`}
                    >
                      <select
                        name="status"
                        id=""
                        className=" bg-gray-800"
                        onChange={change}
                        value={value.status}
                      >
                        {[
                          "Book Issued",
                          "Book Missing",
                          "Book Returned",
                          "Cancelled",
                        ].map((items, i) => (
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button
                        className=" text-green-500 hover:text-pink-600 mx-2"
                        onClick={() => {
                          setOpt(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className=" w-[10%] md:w-[5%]">
                  <button
                    className=" text-xl hover:text-orange-500"
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {userDivData && (
        <UserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default allOrders;
