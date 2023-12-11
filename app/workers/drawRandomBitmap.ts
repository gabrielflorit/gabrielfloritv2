import { getRandomInt } from "~/utils/getRandomInt";

onmessage = function (event: { data: { width: number; height: number } }) {
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
    postMessage(clampedArray, [clampedArray.buffer] as any);
  }
};
