// import { getRandomInt } from "~/utils/getRandomInt";
import { drawLine } from "~/canvasAPI/drawLine";

onmessage = function (event: { data: { width: number; height: number } }) {
  let { width, height } = event.data;

  let offscreen = new OffscreenCanvas(width, height);
  let ctx = offscreen.getContext("2d");
  if (ctx) {
    let arrayBuffer = new ArrayBuffer(width * height * 4);
    let clampedArray = new Uint8ClampedArray(arrayBuffer);

    function setPixel(x: number, y: number) {
      x = Math.floor(x);
      y = Math.floor(y);
      clampedArray[y * width * 4 + x * 4 + 0] = 0;
      clampedArray[y * width * 4 + x * 4 + 1] = 0;
      clampedArray[y * width * 4 + x * 4 + 2] = 0;
      clampedArray[y * width * 4 + x * 4 + 3] = 255;
    }

    drawLine(0, 0, width - 1, height - 1, setPixel);

    postMessage(clampedArray, [clampedArray.buffer] as any);
  }
};
