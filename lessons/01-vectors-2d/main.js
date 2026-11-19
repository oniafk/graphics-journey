import { vec2 } from "../../src/math/index.js";
import { createView, clear, drawGrid, drawVector } from "../../src/viz/canvas2d.js";

const button = document.getElementById("drawButton");
const view = createView(document.querySelector("#stage"));

// Reads the inputs at call time. An empty field gives 0, not NaN.
const readVector = (xId, yId) => [
  Number(document.getElementById(xId).value),
  Number(document.getElementById(yId).value),
];

const drawVectors = () => {
  const a = readVector("aX", "aY");
  const b = readVector("bX", "bY");
  const sum = vec2.add(a, b);

  clear(view);
  drawGrid(view);
  drawVector(view, a, { color: "#d33", label: "a" });
  drawVector(view, b, { color: "#33d", label: "b" });
  drawVector(view, b, { from: a, color: "#999" }); // b placed at the tip of a
  drawVector(view, sum, { color: "#2a2", label: "a+b" });
};

button.addEventListener("click", drawVectors);
drawVectors(); // show the grid on load
