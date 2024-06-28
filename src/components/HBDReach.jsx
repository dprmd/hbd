import { useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import dia from "../dia.json";
import FireworkBG from "./FireworkBG";

export default function HBDReach() {
  document.title = "Happy Birthday";
  const audio = useRef(null);

  function getAge(dateString) {
    const date = new Date();
    const birthDate = new Date(dateString);
    let age = date.getFullYear() - birthDate.getFullYear();
    const m = date.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const date = new Date();
  const thisDate = date.getDate();
  const thisMonth = date.toLocaleString("default", { month: "long" });
  const thisYear = date.getFullYear();
  const age = getAge(
    `${dia.birth.month} ${dia.birth.date}, ${dia.birth.year} ${dia.birth.hourMinuteSecond}`
  );

  return (
    <div className="w-screen h-sreen">
      <audio id="reachSong" loop ref={audio}>
        <source src={dia.HDBReachPathSong} type="audio/mpeg" />
      </audio>
      <div className="">
        <div className="content">
          <span className="text-md font-bold mb-4 block font-inter">
            {thisDate} {thisMonth} {thisYear}
          </span>
          <h1 className="text-xl mb-3 font-jersey20 md:text-2xl">
            Happy Birthday
          </h1>
          <h2 className="text-4xl mb-2 font-medium md:text-4xl mt-8 font-jersey25">
            {dia.name}
          </h2>
          <h3 className="text-2xl mb-8 font-medium font-jersey25">
            {age} Tahun
          </h3>
          <p className="text-[18px] font-medium absolute white w-full font-josefin">
            <Typewriter words={dia.words} loop={false} cursor={true} />
          </p>
          <button
            onClick={() => audio.current.play()}
            className="mt-[50px] border border-slate-400 px-6 py-2 rounded-full font-poppins active:bg-slate-500 duration-300"
          >
            PLAY SONG
          </button>
        </div>
        <FireworkBG />
      </div>
    </div>
  );
}
