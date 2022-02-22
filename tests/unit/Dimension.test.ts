import { Dimension } from "../../src/domain/entities/Dimension";

test("create dimension and calculate volume", () => {
  const dimension = new Dimension({ height: 20, width: 15, depth: 10 });
  expect(dimension.height).toBe(20);
  expect(dimension.width).toBe(15);
  expect(dimension.depth).toBe(10);
  expect(dimension.volume).toBe(0.003);
});

test("volume is 0 when height is less than 1", () => {
  const dimension = new Dimension({ height: 0, width: 15, depth: 10 });
  expect(dimension.volume).toBe(0);
});

test("volume is 0 when width is less than 1", () => {
  const dimension = new Dimension({ height: 20, width: 0, depth: 10 });
  expect(dimension.volume).toBe(0);
});

test("volume is 0 when depth is less than 1", () => {
  const dimension = new Dimension({ height: 20, width: 25, depth: 0 });
  expect(dimension.volume).toBe(0);
});
