import React from "react";
import Marquee from "react-fast-marquee";
import carHome from "../assets/porscherb.png";
import porscheLogo from "../assets/Porsche-Logo.png";
import bmwLogo from "../assets/bmw-logo.png";
import toyotaLogo from "../assets/toyota-logo.png";
import daciaLogo from "../assets/Dacia-logo.png";
import hyundaiLogo from "../assets/hyundai-logo.png";
import nissanLogo from "../assets/Nissan_logo.png";
import kiaLogo from "../assets/kia-logo.png";
import audiLogo from "../assets/audi-logo.png";

import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function HomePage() {
  const [typeEffect] = useTypewriter({
    words: ["Rent A Car", "Buy A Car"],
    loop: true,
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center px-3 ">
          <h1 className="text-3xl md:text-5xl text-center md:leading-snug mt-20 font-bold text-gray-700">
            Fast And Easy Way To
          </h1>
          <h1 className="text-3xl mt-3 md:text-5xl text-center font-bold text-gray-700">
            <span className="">{typeEffect}</span>
            <Cursor />
          </h1>
          <button className="border-2 border-gray-700 text-lg font-semibold px-3 py-2 my-6 hover:bg-gray-700 hover:text-white ease-in-out duration-200">
            Explore More
          </button>
        </div>
        <img src={carHome} className="md:w-[800px]" alt="" />
      </div>
      <Marquee
        direction="right"
        speed={100}
        delay={5}
        autoFill={true}
        className="p-10"
      >
        <div className="mx-12">
          <img className="w-[100px] grayscale" src={kiaLogo} alt="" />
        </div>
        <div className="mx-12">
          <img className="w-[80px] grayscale" src={porscheLogo} alt="" />
        </div>
        <div className="mx-12">
          <img
            className="w-[80px] md:w-[100px]  grayscale"
            src={bmwLogo}
            alt=""
          />
        </div>
        <div className="mx-12">
          <img className="w-[100px] grayscale" src={daciaLogo} alt="" />
        </div>
        <div className="mx-12">
          <img
            className="w-[80px] md:w-[100px] grayscale"
            src={nissanLogo}
            alt=""
          />
        </div>
        <div className="mx-12">
          <img className="w-[120px] grayscale" src={hyundaiLogo} alt="" />
        </div>
        <div className="mx-12">
          <img className="w-[80px] grayscale" src={toyotaLogo} alt="" />
        </div>
        <div className="mx-12">
          <img className="w-[100px] grayscale" src={audiLogo} alt="" />
        </div>
      </Marquee>
    </div>
  );
}
