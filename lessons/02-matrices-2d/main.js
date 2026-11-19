import { mat2 } from "../../src/math/index.js";
import { createView, clear, drawGrid, drawVector } from "../../src/viz/canvas2d.js";

const view = createView(document.querySelector("#stage"));
const solution = document.getElementById("solution");

// Each set is a 2x2 matrix typed by its columns: i = [ix, iy], j = [jx, jy].
const SETS = [
  { key: "entry", title: "Entry vectors", color: "#1a9e3c", defaults: [1, 0, 0, 1] },
  { key: "rot", title: "1. Rotation (blue)", color: "#2563eb", defaults: [1, 0, 0, 1] },
  { key: "shear", title: "2. Shear (red)", color: "#dc2626", defaults: [1, 0, 0, 1] },
  { key: "comp", title: "Composition: your answer (purple)", color: "#7b2cbf", defaults: null },
];
const SOLUTION_COLOR = "#c77dff"; // light purple = what the code computed

const FIELDS = ["ix", "iy", "jx", "jy"];
const inputId = (key, field) => `${key}-${field}`;

const buildSets = () => {
  const container = document.getElementById("sets");
  for (const { key, title, color, defaults } of SETS) {
    const box = document.createElement("fieldset");
    box.style.setProperty("--c", color);
    box.innerHTML = `
      <legend>${title}</legend>
      <div class="row">
        ${["i", "j"]
          .map(
            (v, n) => `
          <span class="vec">${v} = [
            <input type="number" step="any" id="${inputId(key, v + "x")}" value="${defaults ? defaults[n * 2] : ""}" />
            ,
            <input type="number" step="any" id="${inputId(key, v + "y")}" value="${defaults ? defaults[n * 2 + 1] : ""}" />
          ]</span>`,
          )
          .join("")}
      </div>`;
    container.append(box);
  }
};

// Returns the 4 numbers of a set, or null if any field is empty.
const readSet = (key) => {
  const raw = FIELDS.map((f) => document.getElementById(inputId(key, f)).value);
  if (raw.some((r) => r === "")) return null;
  const [ix, iy, jx, jy] = raw.map(Number);
  return { i: [ix, iy], j: [jx, jy] };
};

// Columns -> matrix written by rows, like mat2.js expects.
const toMatrix = ({ i, j }) => [[i[0], j[0]], [i[1], j[1]]];
const toColumns = (M) => ({ i: [M[0][0], M[1][0]], j: [M[0][1], M[1][1]] });

const drawSet = (set, color, suffix = "") => {
  if (!set) return;
  drawVector(view, set.i, { color, label: `i${suffix}` });
  drawVector(view, set.j, { color, label: `j${suffix}` });
};

const draw = () => {
  solution.textContent = "";
  clear(view);
  drawGrid(view);
  for (const { key, color } of SETS) drawSet(readSet(key), color);
};

const fmt = (n) => Number(n.toFixed(4)).toString();
const fmtMatrix = (M) => `| ${fmt(M[0][0])}  ${fmt(M[0][1])} |\n| ${fmt(M[1][0])}  ${fmt(M[1][1])} |`;
const sameMatrix = (A, B) => A.every((row, r) => row.every((v, c) => Math.abs(v - B[r][c]) < 1e-9));

const showComposition = () => {
  draw();
  const rot = readSet("rot");
  const shear = readSet("shear");
  const entry = readSet("entry");
  if (!rot || !shear || !entry) {
    solution.textContent = "Fill in entry, rotation and shear to calculate the composition.";
    return;
  }

  try {
    // rotation first, then shear: shear * rotation, applied to the entry vectors
    const composition = mat2.mul(mat2.mul(toMatrix(shear), toMatrix(rot)), toMatrix(entry));
    drawSet(toColumns(composition), SOLUTION_COLOR, " (code)");

    const mine = readSet("comp");
    const verdict = !mine
      ? "Type your own answer in the purple box to compare."
      : sameMatrix(composition, toMatrix(mine))
        ? "Matches your answer."
        : "Differs from your answer. Re-check your steps (and the order!).";
    solution.textContent = `Composition (shear * rotation * entry), by columns:\n${fmtMatrix(composition)}\n\n${verdict}`;
  } catch (error) {
    solution.textContent = error.message;
  }
};

buildSets();
document.getElementById("drawButton").addEventListener("click", draw);
document.getElementById("compositionButton").addEventListener("click", showComposition);
draw();
