import { Item } from "./Item";

test("create item", () => {
  const item = new Item({
    itemId: 1,
    category: "test1",
    description: "test2",
    price: 20,
  });
  expect(item.itemId).toBe(1);
  expect(item.category).toBe("test1");
  expect(item.description).toBe("test2");
  expect(item.price).toBe(20);
});

test("create item and get volume", () => {
  const item = new Item({
    itemId: 1,
    category: "test",
    description: "test",
    price: 20,
    height: 20,
    width: 15,
    depth: 10,
  });
  expect(item.volume).toBe(0.003);
});

test("create item and get density", () => {
  const item = new Item({
    itemId: 1,
    category: "test",
    description: "test",
    price: 20,
    height: 20,
    width: 15,
    depth: 10,
    weight: 1,
  });
  expect(item.density).toBe(333);
});

test("item dimensions cant be negative", () => {
  expect(
    () =>
      new Item({
        itemId: 1,
        category: "test",
        description: "test",
        price: 20,
        height: -1,
        width: 0,
        depth: 0,
      })
  ).toThrow();
  expect(
    () =>
      new Item({
        itemId: 1,
        category: "test",
        description: "test",
        price: 20,
        height: 0,
        width: -1,
        depth: 0,
      })
  ).toThrow();
  expect(
    () =>
      new Item({
        itemId: 1,
        category: "test",
        description: "test",
        price: 20,
        height: 0,
        width: 0,
        depth: -1,
      })
  ).toThrow();
});

test("item weight cant be negative", () => {
  expect(
    () =>
      new Item({
        itemId: 1,
        category: "test",
        description: "test",
        price: 20,
        weight: -1,
      })
  ).toThrow();
});
