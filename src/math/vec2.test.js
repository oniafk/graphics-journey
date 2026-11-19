import { describe, it, expect } from "vitest";
import { add } from "./vec2.js";

describe("vec2.add", () => {
  it("matches notebook: (1,2) + (3,4) = (4,6)", () => {
    expect(add([1, 2], [3, 4])).toEqual([4, 6]);
  });

  it("matches notebook: (5, -2) + (-3, 6) = (2,4)", () => {
    expect(add([5, -2], [-3, 6])).toEqual([2, 4]);
  });

  it("matches notebook: (0, 7) + (-4, -7) = (-4,0)", () => {
    expect(add([0, 7], [-4, -7])).toEqual([-4, 0]);
  });
});
