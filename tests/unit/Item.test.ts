import { Item } from "../../src/domain/entities/Item";

test("create item", () => {
  const item = new Item({ itemId: 1, description: "test", price: 20 });
  expect(item.itemId).toBe(1);
  expect(item.description).toBe("test");
  expect(item.price).toBe(20);
});

test("create item and get volume", () => {
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

test("create item and get density", () => {
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
