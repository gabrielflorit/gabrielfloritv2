import { getRandomInt } from "~/utils/getRandomInt";

onmessage = function () {
  let width = 8;
  let height = 8;
  let arrayBuffer = new ArrayBuffer(width * height * 4);
  let clampedArray = new Uint8ClampedArray(arrayBuffer);
  for (let i = 0; i < width * height * 4; i += 4) {
    clampedArray[0 + i] = getRandomInt(0, 255);
    clampedArray[1 + i] = getRandomInt(0, 255);
    clampedArray[2 + i] = getRandomInt(0, 255);
    clampedArray[3 + i] = 255;
  }
  postMessage(clampedArray, [clampedArray.buffer]);
};
