// Pure math. No DOM, no canvas, no WebGL.
// A matrix is written like in your notebook, by rows: [[a, b], [c, d]].
//   M = | a  b |      column 1 = [a, c] = where (1,0) lands
//       | c  d |      column 2 = [b, d] = where (0,1) lands

const todo = (name) => () => {
  throw new Error(`TODO: implement mat2.${name} (notebook first, test second, code third)`);
};

export const mulVec = todo('mulVec');       // M * v           -> vector
export const mul = todo('mul');             // A * B           -> matrix (apply B first, then A)
export const rotation = todo('rotation');   // rotation(theta) -> matrix, theta in radians
export const shear = todo('shear');         // shear(k)        -> matrix, horizontal shear
export const scaling = todo('scaling');     // scaling(sx, sy) -> matrix
