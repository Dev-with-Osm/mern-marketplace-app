import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsShieldLock, BsTelephone, BsPlus } from "react-icons/bs";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  console.log(formData);
  const fileRef = useRef(null);
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const { error, loading, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await axios.put(
        `/user/update/${currentUser._id}`,
        formData
      );
      if (response.status === 200) {
        dispatch(updateUserSuccess(response.data));
        console.log(response.data);
        setUpdatedSuccess("Profile has been updated successfully!");
      }
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
      console.log(error);
    }
  };
  return (
    <div className="p-4 flex justify-center md:mt-10 ">
      <form
        onSubmit={handleSubmit}
        className="object-contain md:max-w-xl w-[1000px] flex flex-col items-center justify-center gap-4 pt-5 pb-5 px-10 bg-gray-50  shadow-xl rounded-xl border-2 border-slate-200"
      >
        <input
          disabled={loading}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          multiple={false}
          accept="image/*"
          ref={fileRef}
          hidden
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <p className="m-0 text-xl font-bold text-[#212121]">
            Update Your Informations
          </p>
          <div
            className="relative cursor-pointer"
            onClick={() => fileRef.current.click()}
          >
            <div className="absolute top-[70px] left-14 w-7 h-7   rounded-full bg-gray-50 text-white">
              <BsPlus className=" w-5 h-5 bg-blue-400 rounded-full absolute top-1 left-1" />
            </div>
            <img
              src={formData.avatar || currentUser.avatar}
              alt=""
              className="w-20 mt-5 rounded-full border border-gray-400 object-cover"
            />
          </div>
          <p>
            {fileError ? (
              <span className="text-red-600 font-semibold">
                Error Image upload{" "}
                <span className="text-gray-700">
                  (image must be less than 3 mb)
                </span>
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-600 font-semibold">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-600 font-semibold">
                Image uploaded successfully
              </span>
            ) : null}
          </p>
        </div>
        <br />
        <div className="w-full h-auto relative flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">
            Full Name:
          </label>
          <MdDriveFileRenameOutline className="w-5 absolute z-20 left-3 bottom-2.5" />
          <input
            disabled={loading}
            placeholder="Your Full name"
            type="text"
            id="fullName"
            defaultValue={currentUser.fullName}
            onChange={handleChange}
            className="disabled:cursor-not-allowed w-auto h-10 pl-10 rounded-md outline-none border border-solid border-slate-500 filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">
            Mobile number:
          </label>
          <BsTelephone className="w-5 absolute z-20 left-3 bottom-2.5" />
          <input
            disabled={loading}
            placeholder="0123456789"
            defaultValue={currentUser.mobile}
            type="number"
            id="mobile"
            onChange={handleChange}
            className=" disabled:cursor-not-allowed w-auto h-10 pl-10 rounded-md outline-none border border-solid border-slate-500 filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">Email:</label>
          <MdOutlineEmail className="w-5 absolute z-20 left-3 bottom-2.5" />
          <input
            disabled={loading}
            placeholder="name@mail.com"
            defaultValue={currentUser.email}
            type="email"
            id="email"
            onChange={handleChange}
            className="disabled:cursor-not-allowed w-auto h-10 pl-10 rounded-md outline-none border border-solid border-slate-500 filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="w-full h-auto relative flex flex-col gap-1.5">
          <label className="text-xs text-[#8B8E98] font-semibold">
            Password:
          </label>
          <BsShieldLock className="w-5 absolute z-20 left-3 bottom-2.5" />
          <input
            disabled={loading}
            placeholder="Enter New Password"
            type="password"
            defaultValue={currentUser.password}
            id="password"
            onChange={handleChange}
            className="disabled:cursor-not-allowed w-auto h-10 pl-10 rounded-md outline-none border border-solid border-slate-500 filter drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5)) transition-all duration-300 ease-in-out focus:border-transparent focus:shadow-outline focus:bg-transparent border-transparent focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="disabled:cursor-not-allowed disabled:bg-gray-400 w-full h-10 border-none bg-[#115dfc] rounded-md outline-none text-white cursor-pointer"
        >
          <span>{loading ? "Loading..." : "Update Profile"}</span>
        </button>
        <div className="w-full">
          <h5 className="text-sm text-red-600 font-semibold">{error}</h5>
          <h5 className="text-sm text-green-600 font-semibold">
            {updatedSuccess}
          </h5>
        </div>
        <div className="w-full flex items-center justify-between text-red-500 font-semibold -mt-4">
          <Link className="" to={"/signin"}>
            Delete
          </Link>
          <Link className="" to={"/signin"}>
            Logout
          </Link>
        </div>
      </form>
    </div>
  );
}
