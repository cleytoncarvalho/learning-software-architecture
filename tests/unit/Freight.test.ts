import { Freight } from "../../src/domain/entities/Freight";
import { Item } from "../../src/domain/entities/Item";

test("create freight and calculate total", () => {
  const freight = new Freight();
  freight.addItem({
    item: new Item({
      itemId: 1,
      description: "test",
      price: 10,
      height: 20,
      width: 15,
      depth: 10,
      weight: 1,
    }),
    quantity: 1,
  });
  freight.addItem({
    item: new Item({
      itemId: 1,
      description: "test",
      price: 10,
      height: 100,
      width: 30,
      depth: 10,
      weight: 3,
    }),
    quantity: 2,
  });
  expect(freight.total).toBe(69.99);
});
