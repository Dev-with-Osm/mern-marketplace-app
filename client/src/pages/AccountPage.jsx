import React from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import ProfilePage from "./ProfilePage";
import CreateCarListing from "./CreateCarListing";
import UserListing from "./UserListing";

export default function AccountPage() {
  let { subpage } = useParams();
  console.log(subpage);

  if (subpage === undefined) {
    subpage = "profile";
  }
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && <ProfilePage />}
      {subpage === "create-car-listing" && <CreateCarListing />}
      {subpage === "show-listing" && <UserListing />}
    </div>
  );
}
