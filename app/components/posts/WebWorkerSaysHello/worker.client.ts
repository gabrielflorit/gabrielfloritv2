export function getDateFromWorker(callback: any) {
  let worker = new Worker("webWorkerSaysHello.js");

  worker.postMessage("(new Date()).toGMTString()");
  worker.onmessage = function (e) {
    callback(e.data);
  };
}
