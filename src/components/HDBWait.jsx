/* eslint-disable react/prop-types */

import { useState } from "react";
import Countdown from "react-countdown";
import dia from "../dia.json";
import Rainy from "./Rainy";
import PlayWaitSong from "./PlayWaitSong";

export default function HBDWait({ HBDDay, setHBDDay }) {
  document.title = "Waktu Terus Berjalan";
  const date = new Date();
  const [isHBDReach, setIsHBDReach] = useState(HBDDay);

  function renderer({ days, hours, minutes, seconds }) {
    return (
      <div className="absolute p-4 bg-black border border-slate-800 rounded-t-md w-[80%] sm:w-[400px] box-border">
        <span className="font-bold mb-2 block italic text-sm text-gray-300">
          Menuju {dia.birth.date} {dia.birth.monthName} {dia.targetYear}
        </span>
        <span className="mb-2 block font-poppins text-sm text-gray-300">
          Hitung Mundur Dalam
        </span>
        <span className="font-bold block text-gray-300">
          {days} Hari {hours} Jam {minutes} Menit {seconds} Detik
        </span>
        <PlayWaitSong isHBDReach={isHBDReach} />
      </div>
    );
  }

  function timeLeft() {
    const now = date.getTime();
    const birthDate = new Date(
      `${dia.birth.month} ${dia.birth.date}, ${dia.targetYear} ${dia.birth.hourMinuteSecond}`
    );

    const remainingTime = birthDate - now;
    return remainingTime;
  }

  return (
    <div className="mytext w-screen h-screen flex justify-center pt-60 relative md:pt-50">
      <Rainy />
      <Countdown
        date={Date.now() + timeLeft()}
        renderer={renderer}
        onComplete={() => {
          setHBDDay(true);
          setIsHBDReach(true);
        }}
      />
    </div>
  );
}
