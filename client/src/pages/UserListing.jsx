import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  useEffect(() => {
    const fetchUserListing = async () => {
      const res = await axios.get(`/user/getlisting/${currentUser._id}`);
      setUserListings(res.data);
    };
    fetchUserListing();
  }, [currentUser._id]);
  return (
    <div>
      {userListings.map((value, index) => (
        <div key={index}>{value.name}</div>
      ))}
    </div>
  );
}
