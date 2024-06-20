import { useState, useEffect } from "react";
import dia from "../dia.json";

export default function PlayWaitSong() {
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    const waitSong = document.getElementById("waitSong");
    const interactSong = document.getElementById("interactSong");
    interactSong.addEventListener("click", async function () {
      if (isPlayed) waitSong.pause();
      else waitSong.play();

      const audioCtx = new window.AudioContext();

      let canvas = document
        .getElementById("waitSongCanvas")
        .transferControlToOffscreen();
      const worker = new Worker(
        new URL("./playWaitSongWorker.js", import.meta.url)
      );

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

      function animate() {
        analyser.getByteFrequencyData(dataArray);
        worker.postMessage({ bufferLength, dataArray }, {});
        requestAnimationFrame(animate);
      }

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
              <span className="text-sm block bi bi-pause border border-gray-700 p-1 px-2 rounded-full"></span>
            ) : (
              <span className="text-sm block bi bi-play border border-gray-700 p-1 px-2 rounded-full"></span>
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
          className={`text-2xl font-bold font-josefin duration-500 ${
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
