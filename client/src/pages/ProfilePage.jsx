import React from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser.email}</div>;
}
