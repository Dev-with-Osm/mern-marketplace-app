import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import CreateCarListing from "./pages/CreateCarListing";
import AccountPage from "./pages/AccountPage";
import UserListing from "./pages/UserListing";
import CarListing from "./pages/CarListing";
import NoPage from "./pages/NoPage";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/listing/:listingId" element={<CarListing />} />
          <Route path="*" element={<NoPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<AccountPage />}>
              <Route path="/account/profile" element={<ProfilePage />} />
              <Route
                path="/account/create-car-listing"
                element={<CreateCarListing />}
              />
              <Route path="/account/showlisting" element={<UserListing />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
