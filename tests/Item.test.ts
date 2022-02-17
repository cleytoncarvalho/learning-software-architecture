import { Item } from "../src/Item";

test("create item", () => {
  const item = new Item({ itemId: 1, description: "test", price: 20 });
  expect(item.itemId).toBe(1);
  expect(item.description).toBe("test");
  expect(item.price).toBe(20);
});

test("calculate item volume", () => {
  const item = new Item({
    itemId: 1,
    description: "test",
    price: 20,
    height: 20,
    width: 15,
    depth: 10,
  });
  expect(item.volume).toBe(0.003);
});

test("item volume is 0 when height not informed", () => {
  const item = new Item({ itemId: 1, description: "test", price: 20 });
  expect(item.volume).toBe(0);
});

test("item volume is 0 when width not informed", () => {
  const item = new Item({
    itemId: 1,
    description: "test",
    price: 20,
    height: 20,
  });
  expect(item.volume).toBe(0);
});

test("item volume is 0 when depth not informed", () => {
  const item = new Item({
    itemId: 1,
    description: "test",
    price: 20,
    height: 20,
    width: 15,
  });
  expect(item.volume).toBe(0);
});

test("calculate item density", () => {
  const item = new Item({
    itemId: 1,
    description: "test",
    price: 20,
    height: 20,
    width: 15,
    depth: 10,
    weight: 1,
  });
  expect(item.density).toBe(333);
});

test("item density is 0 when weight not informed", () => {
  const item = new Item({
    itemId: 1,
    description: "test",
    price: 20,
    height: 20,
    width: 15,
    depth: 10,
  });
  expect(item.density).toBe(0);
});

test("item density is 0 when volume not calculated", () => {
  const item = new Item({
    itemId: 1,
    description: "test",
    price: 20,
    weight: 1,
  });
  expect(item.density).toBe(0);
});
