import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { BsPerson, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

export default function Navbar() {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "Home", lihk: "/" },
    { id: 2, text: "Company", lihk: "/signin" },
    { id: 3, text: "Listings", lihk: "/profile" },
    { id: 4, text: "About", lihk: "/" },
    { id: 5, text: "Contact", lihk: "/" },
  ];

  return (
    <div className="shadow-md">
      <div className=" flex justify-between items-center py-4 md:py-0 max-w-[1240px] mx-auto px-4 text-black">
        {/* Logo */}
        <Link to={"/"} className="w-full text-2xl font-bold text-gray-700 ">
          MarketPlace
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="p-4  rounded-xl my-2 cursor-pointer duration-300 hover:text-black"
            >
              <Link to={item.lihk}>{item.text}</Link>
            </li>
          ))}
          <Link
            className="flex items-center justify-center underline  underline-offset-2 rounded-sm  w-28 mr-3"
            to={"/signin"}
          >
            Create Listing
          </Link>
        </ul>

        {/* Mobile Navigation Icon */}
        <div className="flex items-center  gap-4  border-gray-400 rounded-full p-1 text-gray-700">
          <button>
            <BsSearch size={20} />
          </button>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="rounded-full w-24 object-cover sm:w-12 md:w-24"
                alt="user avatar"
              />
            ) : (
              <BsPerson size={28} />
            )}
          </Link>

          <div onClick={handleNav} className="block md:hidden cursor-pointer">
            {nav ? <RiCloseFill size={28} /> : <RiMenu3Fill size={24} />}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <OutsideClickHandler onOutsideClick={() => setNav(false)}>
          <ul
            className={
              nav
                ? "fixed md:hidden left-0 top-0 z-50 w-[60%] h-full border-r shadow-md text-black bg-[#FCFCFF] ease-in-out duration-500"
                : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] "
            }
          >
            {/* Mobile Logo */}
            <h1 className="w-full text-2xl font-bold  text-gray-700 m-4  mb-20 ">
              MarketPlace
            </h1>
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-center p-4  text-lg duration-300 font-semibold cursor-pointer"
              >
                <Link to={item.lihk}>{item.text}</Link>
              </li>
            ))}
            <div className="w-full flex justify-center items-center ">
              <Link className=" underline underline-offset-2 " to={"/signin"}>
                {" "}
                Create Listing
              </Link>
            </div>
          </ul>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
