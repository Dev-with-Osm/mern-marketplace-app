import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage"; // Import ProfilePage component
import { useSelector } from "react-redux";
import { PiHandWavingThin } from "react-icons/pi";

export default function AccountPage() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="flex justify-center mt-7 gap-4">
        <Link
          className={`text-gray-600 border py-2 px-4 rounded-full bg-gray-200 ${
            location.pathname === "/account/profile" ? "active" : ""
          }`}
          to={"/account/profile"}
        >
          Profile
        </Link>
        <Link
          className={`text-gray-600 border py-2 px-4 rounded-full bg-gray-200 ${
            location.pathname === "/account/create-car-listing" ? "active" : ""
          }`}
          to={"/account/create-car-listing"}
        >
          Create Listing
        </Link>
        <Link
          className={`text-gray-600 border py-2 px-4 rounded-full bg-gray-200 ${
            location.pathname === "/account/showlisting" ? "active" : ""
          }`}
          to={"/account/showlisting"}
        >
          My Listings
        </Link>
      </div>

      {location.pathname === "/account" && (
        <div className="w-full flex justify-center">
          <div className="text-center flex flex-col items-center w-[90%] md:w-1/4 relative mt-20 p-4 px-10 text-xl font-medium gap-6 rounded-md border-2">
            <div className="bg-blue-500 p-2 absolute -top-4 rounded-full text-white">
              <PiHandWavingThin />
            </div>

            <h1 className="mt-4 text-gray-600">
              {" "}
              Hello{" "}
              <Link to={"/account/profile"} className="text-blue-500">
                {currentUser?.fullName},
              </Link>{" "}
              Welcome to Your Account, Choose one of the links above to navigate
            </h1>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}
