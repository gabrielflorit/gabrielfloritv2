"use strict";
(() => {
  // app/canvasAPI/drawLine.ts
  function drawLine(x1, y1, x2, y2, setPixel) {
    let steep = false;
    if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
      [x1, y1] = [y1, x1];
      [x2, y2] = [y2, x2];
      steep = true;
    }
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    const derror = Math.abs(dy) * 2;
    let error = 0;
    let y = y1;
    for (let x = x1; x <= x2; x++) {
      if (steep) {
        setPixel(y, x);
      } else {
        setPixel(x, y);
      }
      error += derror;
      if (error > dx) {
        if (y2 > y1) {
          y++;
        } else {
          y--;
        }
        error -= dx * 2;
      }
    }
  }

  // app/workers/drawRandomBitmap.ts
  onmessage = function(event) {
    let { width, height } = event.data;
    let offscreen = new OffscreenCanvas(width, height);
    let ctx = offscreen.getContext("2d");
    if (ctx) {
      let setPixel2 = function(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        clampedArray[y * width * 4 + x * 4 + 0] = 0;
        clampedArray[y * width * 4 + x * 4 + 1] = 0;
        clampedArray[y * width * 4 + x * 4 + 2] = 0;
        clampedArray[y * width * 4 + x * 4 + 3] = 255;
      };
      var setPixel = setPixel2;
      let arrayBuffer = new ArrayBuffer(width * height * 4);
      let clampedArray = new Uint8ClampedArray(arrayBuffer);
      drawLine(0, 0, width - 1, height - 1, setPixel2);
      postMessage(clampedArray, [clampedArray.buffer]);
    }
  };
})();
