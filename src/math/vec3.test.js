import { describe, it, expect } from "vitest";
import { add3d } from "./vec3.js";

describe("vec3.add", () => {
  it("matches notebook: (3,-2,5) + (-1,4,2) = (2,2,7)", () => {
    expect(add3d([3, -2, 5], [-1, 4, 2])).toEqual([2, 2, 7]);
  });

  it("matches notebook: (2,1,3) + (1,0,-5) = (3,1,-1)", () => {
    expect(add3d([2, 1, 3], [1, 0, -5])).toEqual([3, 1, -2]);
  });
});
