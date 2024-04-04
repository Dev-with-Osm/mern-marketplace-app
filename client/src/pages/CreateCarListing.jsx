import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CreateCarListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    location: "",
    color: "",
    engineType: "",
    type: "sale",
    bodyType: "SUV",
    fuelType: "Diesel",
    transmission: "Manual",
    model: "2000",
    offer: false,
    regularPrice: 1000,
    discountPrice: 0,
    features: "",
    additionalNotes: "",
    mileage: "",
    carAge: "",
    images: [],
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await axios.post("/listing/create", {
        ...formData,
        userRef: currentUser._id,
      });
      // console.log(res);
      if (res.status === 200) {
        setLoading(false);
        navigate(`/listing/${res.data._id}`);
      }
    } catch (error) {
      setLoading(false);
      setError(error.res.data.message);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (e.target.id === "offer") {
      setFormData({
        ...formData,
        offer: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSelectChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const yearOptions = [];
  for (let year = 2000; year <= 2024; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 10) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: [...formData.images, ...urls],
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (3 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 10 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `carsImages/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <main className="max-w-5xl mx-auto my-10">
      <h1 className="text-center my-2 font-semibold text-2xl">
        Create a Car Listing
      </h1>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col sm:flex-row gap-6"
      >
        <div className="flex flex-col gap-4 flex-1 p-4">
          <div>
            <label htmlFor="name"> Car Name: </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Car Name"
              className="w-full border border-gray-400 mt-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="brand">Car Brand:</label>
            <input
              type="text"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="description">Car Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="More info about the car"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your Location"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="color">Car color:</label>
            <input
              type="text"
              id="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Car Color"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="engineType">Car EngineType:</label>
            <input
              type="text"
              id="engineType"
              value={formData.engineType}
              onChange={handleChange}
              placeholder="Car EngineType"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="features">Car features:</label>
            <input
              type="text"
              id="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Car features"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="additionalNotes">Additional Notes:</label>
            <textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
              className="w-full border border-gray-400 my-1 py-2 px-3 rounded-lg"
            />
          </div>
          <hr className="h-0.5 w-2/3 mx-auto bg-gray-300" />
          <div className="flex flex-col gap-2">
            <label>Type: (sale or rent)</label>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer discount</span>
              </div>
            </div>
          </div>
          <hr className="h-0.5 w-2/3 mx-auto bg-gray-300" />
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="bodyType">Car BodyType:</label>
              <select
                id="bodyType"
                onChange={handleSelectChange}
                value={formData.bodyType}
                className="border border-gray-400 my-1 py-2 px-3 rounded-lg"
              >
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Brake">Brake</option>
                <option value="Coupe">Coupe</option>
                <option value="Coupe-SUV">Coupe-SUV</option>
                <option value="Cabriolet">Cabriolet</option>
                <option value="MPV">MPV</option>
                <option value="Estates">Estates</option>

                <option value="Four-door coupes">Four-door coupes</option>
                <option value="Saloons">Saloons</option>
                <option value="Shooting brakes">Shooting brakes</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fuelType">Fuel type:</label>
              <select
                id="fuelType"
                onChange={handleSelectChange}
                value={formData.fuelType}
                className="border border-gray-400 my-1 py-2 px-3 rounded-lg"
              >
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Electricity">Electricity</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="transmission">Transmission:</label>
              <select
                id="transmission"
                onChange={handleSelectChange}
                value={formData.transmission}
                className="border border-gray-400 my-1 py-2 px-3 rounded-lg"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="model">Car year-model:</label>
              <select
                id="model"
                onChange={handleSelectChange}
                value={formData.model}
                className="border border-gray-400 my-1 py-2 px-3 rounded-lg"
              >
                {yearOptions}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col gap-2">
              <label>Mileage:</label>
              <input
                onChange={handleChange}
                value={formData.mileage}
                id="mileage"
                type="number"
                className="border border-gray-400 my-1 py-2 px-3 rounded-lg"
                placeholder="Km/h"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Car Age:</label>
              <input
                type="number"
                id="carAge"
                onChange={handleChange}
                value={formData.carAge}
                className="border border-gray-400 my-1 py-2 px-3 rounded-lg"
                placeholder="3 Years"
              />
            </div>
          </div>
          {/* end of slelectors */}
          <hr className="h-0.5 w-2/3 mx-auto bg-gray-300" />{" "}
          <div>
            <p className="mb-2">Price:</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center  gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / week)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>
                    {formData.type === "rent" && (
                      <span className="text-xs">($ / week)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 p-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          <div className="flex gap-6 flex-wrap">
            {formData.images.length > 0 &&
              formData.images.map((url, index) => (
                <div
                  key={url}
                  className="flex flex-wrap w-32 h-32 border relative items-center"
                >
                  <div
                    className="absolute -bottom-4 -right-3 w-10 h-10  rounded-full bg-gray-50 text-white cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <RiDeleteBin6Line className=" w-7 h-7 p-1 bg-red-700 rounded-full absolute top-1 left-1" />
                  </div>

                  <img
                    src={url}
                    alt="listing image"
                    className="w-32 h-32 object-cover
                   rounded-lg"
                  />
                </div>
              ))}
          </div>
          <button
            disabled={loading || uploading}
            className="bg-blue-500 py-2.5 rounded text-white text-lg font-semibold hover:bg-transparent hover:text-gray-800 hover:border-2 border-gray-600 duration-150 ease-in"
          >
            {loading ? "Creating..." : "Create Car Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
