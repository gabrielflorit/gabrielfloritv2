export function getBitmapFromWorker(callback: any) {
  let worker = new Worker("workers/drawRandomBitmap.js");

  worker.postMessage("hello");
  worker.onmessage = function (e) {
    callback(e.data);
  };
}
