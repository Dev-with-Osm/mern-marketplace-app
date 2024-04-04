import React from "react";
import { PiSmileySadThin } from "react-icons/pi";

export default function NoPage() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex items-center justify-center flex-col">
        <PiSmileySadThin className="text-9xl text-red-500" />
        <h1 className="text-4xl font-semibold">Page not Found!</h1>
      </div>
    </div>
  );
}
