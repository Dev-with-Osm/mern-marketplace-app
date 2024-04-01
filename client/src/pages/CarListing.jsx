import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import Table from "../components/Table";

export default function CarListing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const activeBtn = () => {
    return " bg-blue-500 text-white border w-32 h-14";
  };

  console.log(ownerInfo);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListingCar = async () => {
      try {
        const response = await axios.get(`/listing/${params.listingId}`);
        setListing(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchListingCar();
  }, [params.listingId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/user/getuser/${listing?.userRef}`);
        setOwnerInfo(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchUserInfo();
  }, [listing]);

  return (
    <>
      {listing && (
        <div className="md:max-w-6xl mx-auto mt-8 md:my-14 ">
          <div className="flex flex-col md:flex-row  mx-auto  items-center md:justify-between ">
            <div className="flex flex-1 justify-center w-full md:w-3/5 px-4 md:justify-normal ">
              <Swiper navigation>
                {listing.images.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[300px] w-full md:h-[500px] rounded-xl"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex items-center ">
              <Table
                name={listing.name}
                brand={listing.brand}
                location={listing.location}
                type={listing.type}
                color={listing.color}
                fuelType={listing.fuelType}
                transmission={listing.transmission}
                mileage={listing.mileage}
                carAge={listing.carAge}
                bodyType={listing.bodyType}
                model={listing.model}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 my-5">
            <div className="flex text-lg text-slate-800 ">
              {/* Buttons to switch between tabs */}
              <button
                className={
                  activeTab === "description" ? activeBtn() : "border w-32 h-14"
                }
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={
                  activeTab === "features" ? activeBtn() : "border w-32 h-14"
                }
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
              <button
                className={
                  activeTab === "notes" ? activeBtn() : "border w-32 h-14"
                }
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>
            </div>
            {/* Content based on active tab */}
            <div className="border w-fit h-20 px-3 rounded-md">
              {activeTab === "description" && <div>{listing.description}</div>}
              {activeTab === "features" && <div>{listing.features}</div>}
              {activeTab === "notes" && <div>{listing.additionalNotes}</div>}
            </div>
          </div>
          <div>
            <h1>Owner Information:</h1>
            <p>
              Full Name:{" "}
              <span className="text-blue-500 font-medium">
                {ownerInfo?.fullName}
              </span>
            </p>
            <p>
              Email Address:{" "}
              <span className="text-blue-500 font-medium">
                {ownerInfo?.email}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

{
}
