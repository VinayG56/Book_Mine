import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/loader";
const settings = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [value, setValue] = useState({ address: "" });
  const [profile, setProfile] = useState();
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-info",
        { headers }
      );
      setProfile(res.data);
      setValue({ address: res.data.address });
    };
    fetch();
  }, []);
  const handleSubmit = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      value,
      { headers }
    );
    alert(res.data.message);
  };

  return (
    <>
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profile.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profile.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              name="address"
              rows="5"
              placeholder="address"
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default settings;
