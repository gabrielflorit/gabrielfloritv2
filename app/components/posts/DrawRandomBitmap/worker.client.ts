export function getBitmapFromWorker(
  width: number,
  height: number,
  callback: any
) {
  let worker = new Worker("workers/drawRandomBitmap.js");

  worker.postMessage({ width, height });
  worker.onmessage = function (e) {
    callback(e.data);
  };
}
