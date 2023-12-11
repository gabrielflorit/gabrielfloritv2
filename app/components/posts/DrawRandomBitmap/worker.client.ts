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

var blobURL = self.URL.createObjectURL(blob);
var worker = new Worker(blobURL);

export function getBitmapFromWorker(
  width: number,
  height: number,
  callback: any
) {
  // let worker = new Worker("workers/drawRandomBitmap.js");

  worker.postMessage({ width, height });
  worker.onmessage = function (e) {
    callback(e.data);
    // self.URL.revokeObjectURL(blobURL);
  };
}
