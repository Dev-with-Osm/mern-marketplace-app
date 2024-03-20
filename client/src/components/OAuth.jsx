import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/auth/google", {
        fullName: result.user?.displayName,
        email: result.user?.email,
        avatar: result.user?.photoURL,
      });
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log("cloud not sign with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full h-10 flex items-center justify-center gap-2.5 bg-white rounded-md outline-none text-[#242424] border border-solid border-[#e5e5e5] filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out cursor-pointer "
    >
      <FcGoogle />

      <span>Sign In with Google</span>
    </button>
  );
}
