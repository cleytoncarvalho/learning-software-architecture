import { Matter } from "../src/Matter";

test("create matter and calculate density", () => {
  const matter = new Matter({ mass: 1, volume: 0.003 });
  expect(matter.mass).toBe(1);
  expect(matter.volume).toBe(0.003);
  expect(matter.density).toBe(333);
});

test("matter density is 0 when mass is less than 1", () => {
  const matter = new Matter({ mass: 0, volume: 0.003 });
  expect(matter.density).toBe(0);
});

test("matter density is 0 when volume is less than 1", () => {
  const matter = new Matter({ mass: 1, volume: 0 });
  expect(matter.density).toBe(0);
});
