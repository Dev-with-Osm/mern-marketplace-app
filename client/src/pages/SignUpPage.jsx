import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsShieldLock, BsTelephone } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { Link } from "react-router-dom";
export default function SignUpPage() {
  return (
    <div className="p-4 flex  justify-center md:mt-10">
      <form className="object-contain md:max-w-xl flex flex-col items-center justify-center gap-4 pt-5 pb-5 px-10 bg-gray-50 shadow-xl rounded-xl">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="m-0 text-xl font-bold text-[#212121]">
            Sign up for an Account
          </p>
          <span className="text-xs max-w-[80%] text-center leading-3 text-[#8B8E98]">
            Sign up now to unlock a world of possibilities with our app. Enjoy
            seamless access and personalized features tailored just for you.
          </span>
        </div>
        <br />
        <div className="w-full h-auto relative  flex flex-col gap-1.5">
          <label class="text-xs text-[#8B8E98] font-semibold">
            First Name:
          </label>
          <MdDriveFileRenameOutline className="w-5 absolute z-20 left-3 bottom-2.5" />

          <input
            placeholder="Your first name"
            type="text"
            className="w-auto h-10 pl-10 rounded-md outline-none border border-solid border-[#d0cfcf] filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent  border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative  flex flex-col gap-1.5">
          <label class="text-xs text-[#8B8E98] font-semibold">
            Mobile number:
          </label>
          <BsTelephone className="w-5 absolute z-20 left-3 bottom-2.5" />

          <input
            placeholder="0123456789"
            type="text"
            className="w-auto h-10 pl-10 rounded-md outline-none border border-solid border-[#d0cfcf] filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent  border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative  flex flex-col gap-1.5">
          <label class="text-xs text-[#8B8E98] font-semibold">Email:</label>
          <MdOutlineEmail className="w-5 absolute z-20 left-3 bottom-2.5" />

          <input
            placeholder="name@mail.com"
            type="text"
            className="w-auto h-10 pl-10 rounded-md outline-none border border-solid border-[#d0cfcf] filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent  border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">
            Password:
          </label>
          <BsShieldLock className="w-5 absolute z-20 left-3 bottom-2.5" />

          <input
            placeholder="Password"
            type="password"
            className="w-auto h-10 pl-10 rounded-md outline-none border border-solid border-[#d0cfcf] filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent  border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 border-none bg-[#115dfc] rounded-md outline-none text-white cursor-pointer"
        >
          <span>Sign Up</span>
        </button>
        <div className="w-full">
          <h1 className="text-[12px] font-semibold text-right">
            Already have an account?{" "}
            <Link className="text-blue-500" to={"/signin"}>
              Sign In
            </Link>{" "}
          </h1>
        </div>

        <div className="w-full flex items-center justify-center gap-8 text-[#8b8e98] ">
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8] " />
          <span>Or</span>
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8] " />
        </div>
        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center gap-2.5 bg-white rounded-md outline-none text-[#242424] border border-solid border-[#e5e5e5] filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out cursor-pointer "
        >
          <FcGoogle />

          <span>Sign In with Google</span>
        </button>
        <p className="text-xs text-[#8b8e98] underline">
          Terms of use &amp; Conditions
        </p>
      </form>
    </div>
  );
}
