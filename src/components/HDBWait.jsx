/* eslint-disable react/prop-types */
import Countdown from "react-countdown";
import dia from "../dia.json";
import Rainy from "./Rainy";
import PlayWaitSong from "./PlayWaitSong";

export default function HBDWait({ setHBDDay }) {
  document.title = "Waktu Terus Berjalan";

  const date = new Date();
  const thisDate = date.getDate();
  const thisMonth = date.getMonth() + 1;
  let thisYear = date.getFullYear();
  const targetDate = dia.birth.date;
  const targetMonth = dia.birth.month;
  const targetHourMinuteSecond = dia.birth.hourMinuteSecond;
  let targetYear;

  if (thisDate < dia.birth.date && thisMonth <= dia.birth.month) {
    targetYear = thisYear;
  }
  if (thisDate > dia.birth.date && thisMonth <= dia.birth.month) {
    targetYear = thisYear;
  }
  if (thisDate < dia.birth.date && thisMonth >= dia.birth.month) {
    targetYear = thisYear + 1;
  }
  if (thisDate > dia.birth.date && thisMonth >= dia.birth.month) {
    targetYear = thisYear + 1;
  }

  function renderer({ days, hours, minutes, seconds }) {
    return (
      <div className="absolute p-4 bg-black border border-slate-800 rounded-t-md w-[80%] sm:w-[400px] box-border">
        <span className="font-bold mb-2 block italic text-sm text-gray-300">
          Menuju {dia.birth.date} {dia.birth.monthName} {targetYear}
        </span>
        <span className="mb-2 block font-poppins text-sm text-gray-300">
          Hitung Mundur Dalam
        </span>
        <span className="font-bold block text-gray-300">
          {days} Hari {hours} Jam {minutes} Menit {seconds} Detik
        </span>
        <PlayWaitSong />
      </div>
    );
  }

  function timeLeft() {
    const now = date.getTime();
    const birthDate = new Date(
      `${targetMonth} ${targetDate}, ${targetYear} ${targetHourMinuteSecond}`
      // "6 28, 2024 00:00:00"
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
          console.log("Is Complete");
          setHBDDay(true);
        }}
      />
    </div>
  );
}
