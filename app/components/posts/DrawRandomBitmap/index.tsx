import { useEffect, useRef, useState } from "react";
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
      worker.current = new Worker("workers/drawRandomBitmap.js");
    }
  });

  useInterval(() => {
    if (worker.current) {
      worker.current.postMessage({ width, height });
      worker.current.onmessage = function ({
        data,
      }: {
        data: Uint8ClampedArray;
      }) {
        setClampedArray(data);
      };
    }
  }, 1000);

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
