import { useEffect, useRef } from "react";
import { getBitmapFromWorker } from "./worker.client";

export function DrawRandomBitmap() {
  let width = 8;
  let height = 8;
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getBitmapFromWorker(function (data: any) {
      let canvas = canvasRef.current;
      if (canvas) {
        let ctx = canvas.getContext("2d");
        if (ctx && data.length) {
          let imageData = new ImageData(data, 8);
          ctx.putImageData(imageData, 0, 0);
        }
      }
    });
  });

  function handleClick() {
    getBitmapFromWorker(function (data: any) {
      let canvas = canvasRef.current;
      if (canvas) {
        let ctx = canvas.getContext("2d");
        if (ctx && data.length) {
          let imageData = new ImageData(data, 8);
          ctx.putImageData(imageData, 0, 0);
        }
      }
    });
  }
  let pixelSize = 32;

  return (
    <section className="mb-16">
      <h3 className="uppercase">Drawing random bitmaps</h3>
      <p>
        The following canvas element is drawn with bitmaps computed by a Web
        Worker.
      </p>
      <canvas
        className="border"
        ref={canvasRef}
        width={width}
        height={width}
        style={{ width: width * pixelSize, height: height * pixelSize }}
      />
      <button className="bg-black text-white p-2" onClick={handleClick}>
        Draw new
      </button>
    </section>
  );
}
