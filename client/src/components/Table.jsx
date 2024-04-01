import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoCarSportOutline } from "react-icons/io5";
import { MdCarRental, MdColorize, MdOutlineSpeed } from "react-icons/md";
import { BsFuelPump, BsCalendarDate } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { BiSolidCarGarage } from "react-icons/bi";
import { PiCarProfile } from "react-icons/pi";
import { CgDetailsMore } from "react-icons/cg";

export default function Table(props) {
  return (
    <div className="relative w-full flex flex-col shadow-md mt-5 md:mt-0  rounded-md overflow-hidden">
      <div>
        <table className="w-auto ">
          <tbody>
            <tr className="border">
              <th className="text-sm px-6 py-3 border flex items-center gap-2">
                <CgDetailsMore className="text-blue-500" />
                Name:
              </th>
              <td className="text-sm px-6 py-3">{props.name}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3  flex items-center gap-2 border-r">
                <IoCarSportOutline className="text-blue-500" />
                Brand
              </th>
              <td className="text-sm px-6 py-3">{props.brand}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3  flex items-center gap-2 border-r">
                <CiLocationOn className="text-blue-500" />
                Location:
              </th>
              <td className="text-sm px-6 py-3">{props.location}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <MdCarRental className="text-blue-500" />
                For:
              </th>
              <td className="text-sm px-6 py-3">{props.type}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <MdColorize className="text-blue-500" />
                Color:
              </th>
              <td className="text-sm px-6 py-3">{props.color}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <BsFuelPump className="text-blue-500" />
                Fuel Type:
              </th>
              <td className="text-sm px-6 py-3">{props.fuelType}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <TbManualGearbox className="text-blue-500" />
                Gearbox:
              </th>
              <td className="text-sm px-6 py-3">{props.transmission}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <MdOutlineSpeed className="text-blue-500" />
                Mileage:
              </th>
              <td className="text-sm px-6 py-3">{props.mileage + " Km"}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <BiSolidCarGarage className="text-blue-500" />
                Car Age:
              </th>
              <td className="text-sm px-6 py-3">
                {props.carAge + " year'(s)"}
              </td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <PiCarProfile className="text-blue-500" />
                Car Body Type:
              </th>
              <td className="text-sm px-6 py-3">{props.bodyType}</td>
            </tr>
            <tr className="border">
              <th className="text-sm px-6 py-3 flex items-center gap-2 border-r">
                <BsCalendarDate className="text-blue-500" />
                Model:
              </th>
              <td className="text-sm px-6 py-3">{props.model}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
