import { useState, useEffect } from "react";
import dia from "../dia.json";

export default function PlayWaitSong() {
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    const waitSong = document.getElementById("waitSong");
    const interactSong = document.getElementById("interactSong");
    interactSong.addEventListener("click", async () => {
      if (isPlayed) {
        waitSong.pause();
      } else {
        waitSong.play();
      }

      const audioCtx = new window.AudioContext();

      let canvas = document
        .getElementById("waitSongCanvas")
        .transferControlToOffscreen();
      const worker = new Worker(
        new URL("../playWaitSongWorker.js", import.meta.url)
      );
      console.log(import.meta.url);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      worker.postMessage({ canvas }, [canvas]);

      let audioSource = null;
      let analyser = null;

      audioSource = audioCtx.createMediaElementSource(waitSong);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 128;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        analyser.getByteFrequencyData(dataArray);
        worker.postMessage({ bufferLength, dataArray }, {});
        requestAnimationFrame(animate);
      };

      animate();
    });
  }, [isPlayed]);

  return (
    <div className="top-full absolute box-border w-full h-[70%] left-0 rounded-b-md border border-slate-800">
      <audio id="waitSong" loop>
        <source src={dia.waitSong.path} type="audio/mpeg" />
      </audio>
      <div className="absolute top-full mt-4">
        <div
          id="interactSong"
          className="inline-block font-jersey20 cursor-pointer bg-black rounded-full border border-gray-700 flex items-center"
          onClick={() => setIsPlayed(!isPlayed)}
        >
          <span className="flex justify-center items-center">
            {isPlayed ? (
              <span className="text-sm block border border-gray-700 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5" />
                </svg>
              </span>
            ) : (
              <span className="text-sm block border border-gray-700 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                </svg>
              </span>
            )}
          </span>
          <span className="pl-2 pr-3">{isPlayed ? "Pause" : "Play"} Song</span>
        </div>
      </div>
      <div
        id="music-visualizer"
        className="absolute rounded-b-md flex justify-center items-center"
      >
        <span
          className={`text-xl font-bold font-josefin duration-500 ${
            isPlayed ? "opacity-0" : "opacity-100"
          }`}
        >
          {dia.waitSong.title}
        </span>
        <canvas id="waitSongCanvas" className="bg-opacity-0"></canvas>
      </div>
    </div>
  );
}
