import { useEffect } from "react";

export default function Rainy() {
  const speed = 0.03;

  useEffect(() => {
    let OPT = {
      selector: "#sparks",
      amount: 1000,
      speed: speed,
      lifetime: 200,
      direction: { x: 0.02, y: 0.7 },
      size: [1, 1],
      maxopacity: 1,
      color: "255, 255, 255",
      randColor: false,
      acceleration: [5, 40],
    };

    return (function spark() {
      const canvas = document.querySelector(OPT.selector);
      const ctx = canvas.getContext("2d");

      let sparks = [];

      window.addEventListener("resize", () => {
        setCanvasWidth();
      });

      function setCanvasWidth() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }

      function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function init() {
        setCanvasWidth();

        window.setInterval(() => {
          if (sparks.length < OPT.amount) {
            addSpark();
          }
        }, 1000 / OPT.amount);

        window.requestAnimationFrame(draw);
      }

      function draw() {
        ctx.fillStyle = "rgba(0,0,0, 0.1)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        sparks.forEach((spark, i, array) => {
          if (spark.opacity <= 0) {
            array.splice(i, 1);
          } else {
            drawSpark(spark);
          }
        });

        window.requestAnimationFrame(draw);
      }

      function Spark(x, y) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.acceleration = rand(OPT.acceleration[0], OPT.acceleration[1]);

        this.color = OPT.randColor
          ? rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255)
          : OPT.color;

        this.opacity = OPT.maxopacity - this.age / (OPT.lifetime * rand(1, 10));

        this.go = function () {
          this.x += (OPT.speed * OPT.direction.x * this.acceleration) / 2;
          this.y += (OPT.speed * OPT.direction.y * this.acceleration) / 2;

          this.opacity = OPT.maxopacity - ++this.age / OPT.lifetime;
        };
      }

      function addSpark() {
        let x = rand(-200, window.innerWidth + 200);
        let y = rand(-200, window.innerHeight + 200);
        sparks.push(new Spark(x, y));
      }

      function drawSpark(spark) {
        let x = spark.x,
          y = spark.y;

        spark.go();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
        ctx.rect(x, y, OPT.size[0], OPT.size[1], 0, 0, Math.PI * 2);
        ctx.fill();
      }

      init();
    })();
  }, []);

  return (
    <canvas
      id="sparks"
      className="absolute w-[100%] h-[100%] top-0 left-0"
    ></canvas>
  );
}
