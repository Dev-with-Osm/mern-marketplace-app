import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignInPage() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post("/auth/login", formData);
      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };
  return (
    <div className="p-4 flex  justify-center md:mt-10">
      <form
        onSubmit={handleSubmit}
        className="object-contain md:max-w-xl flex flex-col items-center justify-center gap-4 pt-10 pb-5 px-10 bg-gray-50 shadow-xl rounded-xl"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="m-0 text-xl font-bold text-[#212121]">
            Login to your Account
          </p>
          <span className="text-xs max-w-[80%] text-center leading-5 text-[#8B8E98]">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <br />
        <div className="w-full h-auto relative  flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">Email</label>
          <MdOutlineEmail className="w-5 absolute z-20 left-3 bottom-2.5" />

          <input
            placeholder="name@mail.com"
            type="email"
            id="email"
            onChange={handleChange}
            disabled={loading}
            className="w-auto h-10 pl-10 disabled:cursor-not-allowed rounded-md outline-none border-2 border-solid border-slate-300 filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent  border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">
            Password
          </label>
          <BsShieldLock className="w-5 absolute z-20 left-3 bottom-2.5" />

          <input
            placeholder="Password"
            type="password"
            id="password"
            disabled={loading}
            onChange={handleChange}
            className="w-auto h-10 disabled:cursor-not-allowed pl-10 rounded-md outline-none border-2 border-solid border-slate-300 filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent  border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed h-10 border-none bg-[#115dfc] rounded-md outline-none text-white cursor-pointer"
        >
          <span>Sign In</span>
        </button>
        <div className="w-full">
          <h5 className="text-sm text-red-600 font-semibold">{error}</h5>
        </div>
        <div className="w-full">
          <h1 className="text-[12px] font-semibold text-right">
            Don't have an account?{" "}
            <Link className="text-blue-500" to={"/signup"}>
              Sign Up
            </Link>{" "}
          </h1>
        </div>

        <div className="w-full flex items-center justify-center gap-8 text-[#8b8e98] ">
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8] " />
          <span>Or</span>
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8] " />
        </div>
        <OAuth />
        <p className="text-xs text-[#8b8e98] underline">
          Terms of use &amp; Conditions
        </p>
      </form>
    </div>
  );
}
