// AccountNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
  const { pathname } = useLocation();

  console.log(useLocation());

  let subpage = pathname.split("/")?.[2];

  console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes = "p-2 px-2 md:px-6 font-medium flex gap-1 rounded-full";
    if (type === subpage) {
      classes += " bg-blue-500 text-white ";
    } else {
      classes += " bg-gray-100 ";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex gap-6 mt-8 justify-center">
        <Link className={linkClasses("profile")} to="/account">
          My Profile
        </Link>
        <Link
          className={linkClasses("create-car-listing")}
          to="/account/create-car-listing"
        >
          Create Listing
        </Link>
        <Link
          className={linkClasses("show-listing")}
          to="/account/show-listing"
        >
          Create Listing
        </Link>
      </nav>
    </div>
  );
}
