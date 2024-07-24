/* eslint-disable react/prop-types */
import Countdown from "react-countdown";
import dia from "../dia.json";
import Rainy from "./Rainy";
import PlayWaitSong from "./PlayWaitSong";
import { getTimeFromServer } from "./../utils/time";
import { useState } from "react";
import { useEffect } from "react";

const getTargetYear = (date) => {
  const thisDate = date.getDate();
  const thisMonth = date.getMonth() + 1;
  const thisYear = date.getFullYear();
  const targetDate = dia.birth.date;
  const targetMonth = dia.birth.month;
  let targetYear;

  if (thisDate < targetDate && thisMonth < targetMonth) {
    targetYear = thisYear;
  }
  if (thisDate > targetDate && thisMonth < targetMonth) {
    targetYear = thisYear;
  }
  if (thisDate < targetDate && thisMonth === targetMonth) {
    targetYear = thisYear;
  }
  if (thisDate > targetDate && thisMonth === targetMonth) {
    targetYear = thisYear + 1;
  }
  if (thisDate < targetDate && thisMonth > targetMonth) {
    targetYear = thisYear + 1;
  }
  if (thisDate > targetDate && thisMonth > targetMonth) {
    targetYear = thisYear + 1;
  }
  if (thisDate === targetDate && thisMonth < targetMonth) {
    targetYear = thisYear;
  }
  if (thisDate === targetDate && thisMonth > targetMonth) {
    targetYear = thisYear + 1;
  }
  if (thisDate === targetDate && thisMonth === targetMonth) {
    targetYear = thisYear;
  }

  return targetYear;
};

export default function HBDWait({ setHBDDay }) {
  document.title = "Waktu Terus Berjalan";
  const [date, setDate] = useState({});
  const [didFetch, setDidFetch] = useState(false);

  const renderer = ({ days, hours, minutes, seconds }) => {
    const targetYear = getTargetYear(date);
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
  };

  const timeLeft = () => {
    const targetDate = dia.birth.date;
    const targetMonth = dia.birth.month;
    const targetHourMinuteSecond = dia.birth.hourMinuteSecond;
    const targetYear = getTargetYear(date);
    const now = date.getTime();
    const birthDate = new Date(
      `${targetMonth} ${targetDate}, ${targetYear} ${targetHourMinuteSecond}`
    );

    const remainingTime = birthDate - now;
    return remainingTime;
  };

  useEffect(() => {
    const getDateFromServer = async () => {
      const dateFromServer = await getTimeFromServer();
      setDate(dateFromServer);
      setDidFetch(true);
    };

    getDateFromServer();
  }, []);

  return (
    <>
      {didFetch && (
        <div className="mytext w-screen h-screen flex justify-center pt-60 relative md:pt-50">
          <Rainy />
          <Countdown
            date={Date.now() + timeLeft()}
            renderer={renderer}
            onComplete={() => {
              setHBDDay(true);
            }}
          />
        </div>
      )}
    </>
  );
}
