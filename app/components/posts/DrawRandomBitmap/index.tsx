import { useEffect, useRef, useState } from "react";
// import { getBitmapFromWorker } from "./worker.client";
import { useInterval } from "~/utils/useSetInterval";

export function DrawRandomBitmap() {
  let [clampedArray, setClampedArray] = useState<Uint8ClampedArray | undefined>(
    undefined
  );

  let width = 16;
  let height = 16;
  let pixelSize = 16;
  let worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      var blobURL = URL.createObjectURL(blob);
      worker.current = new Worker(blobURL);
    }
  });

  useInterval(() => {
    if (worker.current) {
      worker.current.postMessage({ width, height });
      worker.current.onmessage = function (e: any) {
        setClampedArray(e.data);
      };
    }
  }, 1000 / 60);

  return (
    <section className="mb-16">
      <h3 className="uppercase">Drawing random bitmaps</h3>
      <p>
        The following canvas element is drawn with bitmaps computed by a Web
        Worker.
      </p>
      <Canvas
        width={width}
        height={height}
        pixelSize={pixelSize}
        clampedArray={clampedArray}
      />
    </section>
  );
}

function Canvas({
  width,
  height,
  pixelSize,
  clampedArray,
}: {
  width: number;
  height: number;
  pixelSize: number;
  clampedArray?: Uint8ClampedArray;
}) {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    if (canvas) {
      let ctx = canvas.getContext("2d");
      if (ctx && clampedArray) {
        let imageData = new ImageData(clampedArray, width);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  });
  return (
    <canvas
      className="border"
      ref={canvasRef}
      width={width}
      height={width}
      style={{ width: width * pixelSize, height: height * pixelSize }}
    />
  );
}

var blob = new Blob([
  `(() => {
  // app/utils/getRandomInt.ts
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // app/workers/drawRandomBitmap.ts
  onmessage = function(event) {
    let { width, height } = event.data;
    let offscreen = new OffscreenCanvas(width, height);
    let ctx = offscreen.getContext("2d");
    if (ctx) {
      let arrayBuffer = new ArrayBuffer(width * height * 4);
      let clampedArray = new Uint8ClampedArray(arrayBuffer);
      for (let i = 0; i < width * height * 4; i += 4) {
        clampedArray[0 + i] = getRandomInt(0, 255);
        clampedArray[1 + i] = getRandomInt(0, 255);
        clampedArray[2 + i] = getRandomInt(0, 255);
        clampedArray[3 + i] = 255;
      }
      postMessage(clampedArray, [clampedArray.buffer]);
    }
  };
})();`,
]);
