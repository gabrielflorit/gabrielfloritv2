export function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  setPixel: (x: number, y: number) => void
) {
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
