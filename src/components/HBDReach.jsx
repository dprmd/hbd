import { useRef, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import FireworkBG from "./FireworkBG";
import dia from "../dia.json";

export default function HBDReach() {
  document.title = "Happy Birthday";

  const audio = useRef(null);
  const date = new Date();
  const thisDate = date.getDate();
  const thisMonth = date.toLocaleString("default", { month: "long" });
  const thisYear = date.getFullYear();

  const getAge = (dateString) => {
    const birthDate = new Date(dateString);
    let age = date.getFullYear() - birthDate.getFullYear();
    const m = date.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(
    `${dia.birth.month} ${dia.birth.date}, ${dia.birth.year} ${dia.birth.hourMinuteSecond}`
  );

  useEffect(() => {
    const flower1 = document.querySelector(".flower1");
    const flower2 = document.querySelector(".flower2");

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const changeColor = () => {
      flower1.style.color = getRandomColor();
      flower2.style.color = getRandomColor();
    };

    changeColor();
    setInterval(changeColor, 2000);
  }, []);

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
          <div className="mb-3 md:text-2xl w-max mx-auto relative flex justify-center items-center">
            <div className="mx-1 text-2xl absolute fill-current right-full duration-1000 flower1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="spin"
                viewBox="0 0 16 16"
              >
                <path d="M11.424 8c.437-.052.811-.136 1.04-.268a2 2 0 0 0-2-3.464c-.229.132-.489.414-.752.767C9.886 4.63 10 4.264 10 4a2 2 0 1 0-4 0c0 .264.114.63.288 1.035-.263-.353-.523-.635-.752-.767a2 2 0 0 0-2 3.464c.229.132.603.216 1.04.268-.437.052-.811.136-1.04.268a2 2 0 1 0 2 3.464c.229-.132.489-.414.752-.767C6.114 11.37 6 11.736 6 12a2 2 0 1 0 4 0c0-.264-.114-.63-.288-1.035.263.353.523.635.752.767a2 2 0 1 0 2-3.464c-.229-.132-.603-.216-1.04-.268M9 4a2 2 0 0 1-.045.205q-.059.2-.183.484a13 13 0 0 1-.637 1.223L8 6.142l-.135-.23a13 13 0 0 1-.637-1.223 4 4 0 0 1-.183-.484A2 2 0 0 1 7 4a1 1 0 1 1 2 0M3.67 5.5a1 1 0 0 1 1.366-.366 2 2 0 0 1 .156.142q.142.15.326.4c.245.333.502.747.742 1.163l.13.232-.265.002a13 13 0 0 1-1.379-.06 4 4 0 0 1-.51-.083 2 2 0 0 1-.2-.064A1 1 0 0 1 3.67 5.5m1.366 5.366a1 1 0 0 1-1-1.732l.047-.02q.055-.02.153-.044.202-.048.51-.083a13 13 0 0 1 1.379-.06q.135 0 .266.002l-.131.232c-.24.416-.497.83-.742 1.163a4 4 0 0 1-.327.4 2 2 0 0 1-.155.142M9 12a1 1 0 0 1-2 0 2 2 0 0 1 .045-.206q.058-.198.183-.483c.166-.378.396-.808.637-1.223L8 9.858l.135.23c.241.415.47.845.637 1.223q.124.285.183.484A1.3 1.3 0 0 1 9 12m3.33-6.5a1 1 0 0 1-.366 1.366 2 2 0 0 1-.2.064q-.202.048-.51.083c-.412.045-.898.061-1.379.06q-.135 0-.266-.002l.131-.232c.24-.416.497-.83.742-1.163a4 4 0 0 1 .327-.4q.07-.074.114-.11l.041-.032a1 1 0 0 1 1.366.366m-1.366 5.366a2 2 0 0 1-.155-.141 4 4 0 0 1-.327-.4A13 13 0 0 1 9.74 9.16l-.13-.232.265-.002c.48-.001.967.015 1.379.06q.308.035.51.083.098.024.153.044l.048.02a1 1 0 1 1-1 1.732zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
              </svg>
            </div>
            <h1 className="w-max text-2xl font-jersey20">Happy Birthday</h1>
            <div className="mx-1 text-2xl absolute fill-current left-full duration-1000 flower2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="spin"
                viewBox="0 0 16 16"
              >
                <path d="M11.424 8c.437-.052.811-.136 1.04-.268a2 2 0 0 0-2-3.464c-.229.132-.489.414-.752.767C9.886 4.63 10 4.264 10 4a2 2 0 1 0-4 0c0 .264.114.63.288 1.035-.263-.353-.523-.635-.752-.767a2 2 0 0 0-2 3.464c.229.132.603.216 1.04.268-.437.052-.811.136-1.04.268a2 2 0 1 0 2 3.464c.229-.132.489-.414.752-.767C6.114 11.37 6 11.736 6 12a2 2 0 1 0 4 0c0-.264-.114-.63-.288-1.035.263.353.523.635.752.767a2 2 0 1 0 2-3.464c-.229-.132-.603-.216-1.04-.268M9 4a2 2 0 0 1-.045.205q-.059.2-.183.484a13 13 0 0 1-.637 1.223L8 6.142l-.135-.23a13 13 0 0 1-.637-1.223 4 4 0 0 1-.183-.484A2 2 0 0 1 7 4a1 1 0 1 1 2 0M3.67 5.5a1 1 0 0 1 1.366-.366 2 2 0 0 1 .156.142q.142.15.326.4c.245.333.502.747.742 1.163l.13.232-.265.002a13 13 0 0 1-1.379-.06 4 4 0 0 1-.51-.083 2 2 0 0 1-.2-.064A1 1 0 0 1 3.67 5.5m1.366 5.366a1 1 0 0 1-1-1.732l.047-.02q.055-.02.153-.044.202-.048.51-.083a13 13 0 0 1 1.379-.06q.135 0 .266.002l-.131.232c-.24.416-.497.83-.742 1.163a4 4 0 0 1-.327.4 2 2 0 0 1-.155.142M9 12a1 1 0 0 1-2 0 2 2 0 0 1 .045-.206q.058-.198.183-.483c.166-.378.396-.808.637-1.223L8 9.858l.135.23c.241.415.47.845.637 1.223q.124.285.183.484A1.3 1.3 0 0 1 9 12m3.33-6.5a1 1 0 0 1-.366 1.366 2 2 0 0 1-.2.064q-.202.048-.51.083c-.412.045-.898.061-1.379.06q-.135 0-.266-.002l.131-.232c.24-.416.497-.83.742-1.163a4 4 0 0 1 .327-.4q.07-.074.114-.11l.041-.032a1 1 0 0 1 1.366.366m-1.366 5.366a2 2 0 0 1-.155-.141 4 4 0 0 1-.327-.4A13 13 0 0 1 9.74 9.16l-.13-.232.265-.002c.48-.001.967.015 1.379.06q.308.035.51.083.098.024.153.044l.048.02a1 1 0 1 1-1 1.732zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
              </svg>
            </div>
          </div>
          <h2 className=" mb-2 mt-8 w-max mx-auto text-4xl font-medium font-jersey25 text-slate-300">
            {dia.name}
          </h2>
          <h3 className="text-2xl mb-8 font-medium font-jersey25 text-slate-300">
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
