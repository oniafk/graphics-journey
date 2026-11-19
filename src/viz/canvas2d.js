// Canvas 2D helpers. Draws what src/math computes. Never the other way around.
// World coords: origin at canvas center, +y UP (like your notebook), 1 unit = `scale` px.

export function createView(canvas, scale = 20) {
  const ctx = canvas.getContext("2d");
  const toScreen = ([x, y]) => [
    canvas.width / 2 + x * scale,
    canvas.height / 2 - y * scale,
  ];
  return { ctx, canvas, scale, toScreen };
}

export function clear({ ctx, canvas }) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawGrid({ ctx, canvas, scale, toScreen }) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#ddd";
  const halfW = Math.ceil(canvas.width / 2 / scale);
  const halfH = Math.ceil(canvas.height / 2 / scale);
  ctx.beginPath();
  for (let x = -halfW; x <= halfW; x++) {
    ctx.moveTo(...toScreen([x, -halfH]));
    ctx.lineTo(...toScreen([x, halfH]));
  }
  for (let y = -halfH; y <= halfH; y++) {
    ctx.moveTo(...toScreen([-halfW, y]));
    ctx.lineTo(...toScreen([halfW, y]));
  }
  ctx.stroke();

  ctx.strokeStyle = "#888";
  ctx.beginPath();
  ctx.moveTo(...toScreen([-halfW, 0]));
  ctx.lineTo(...toScreen([halfW, 0]));
  ctx.moveTo(...toScreen([0, -halfH]));
  ctx.lineTo(...toScreen([0, halfH]));
  ctx.stroke();
}

export function drawVector(
  view,
  v,
  { from = [0, 0], color = "#d33", label } = {},
) {
  const { ctx, toScreen } = view;
  const [x0, y0] = toScreen(from);
  const [x1, y1] = toScreen([from[0] + v[0], from[1] + v[1]]);
  const angle = Math.atan2(y1 - y0, x1 - x0);
  const head = 10;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(
    x1 - head * Math.cos(angle - Math.PI / 6),
    y1 - head * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    x1 - head * Math.cos(angle + Math.PI / 6),
    y1 - head * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fill();

  if (label) ctx.fillText(label, x1 + 6, y1 - 6);
}

export function drawPolygon(
  { ctx, toScreen },
  points,
  { color = "#888", fill } = {},
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((p, i) =>
    i === 0 ? ctx.moveTo(...toScreen(p)) : ctx.lineTo(...toScreen(p)),
  );
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.stroke();
}
