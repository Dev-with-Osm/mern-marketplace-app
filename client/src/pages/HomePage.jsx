import React from "react";
import carHome from "../assets/porscherb.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function HomePage() {
  const [typeEffect] = useTypewriter({
    words: ["rental marketplace", "sales marketplace"],
    loop: true, // Specify loop as true to cycle through the words continuously
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center px-3">
        <h1 className="text-2xl md:text-4xl text-center md:leading-snug mt-20 font-semibold text-gray-700">
          Explore the world's largest car sharing &{" "}
        </h1>
        <h1 className="text-2xl md:text-4xl text-center font-semibold text-gray-700">
          <span className="font-semibold">{typeEffect}</span>
          <Cursor />
        </h1>
        <button className="border-2 border-gray-700 text-lg font-semibold px-3 py-2 my-6 hover:bg-gray-700 hover:text-white ease-in-out duration-200">
          Explore More
        </button>
      </div>
      <img src={carHome} className="md:w-[800px]" alt="" />
    </div>
  );
}
