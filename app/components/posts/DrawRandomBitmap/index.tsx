import { useEffect, useRef, useState } from "react";
import { useInterval } from "~/utils/useSetInterval";
import { Canvas } from "./Canvas";

export function DrawRandomBitmap() {
  let [clampedArray, setClampedArray] = useState<Uint8ClampedArray | undefined>(
    undefined
  );

  let width = 128;
  let height = 128;
  let pixelSize = 4;
  let worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker("workers/drawRandomBitmap.js");
    }
  });

  useInterval(() => {
    if (worker.current) {
      worker.current.postMessage({
        width,
        height,
        code: "line(0, 0, 32, 64); line(0, 0, 10, 10)",
      });
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
