import { FreightItem } from "./FreightItem";

test("create freight item", () => {
  const orderItem = new FreightItem({
    volume: 10,
    density: 3,
    quantity: 2,
  });
  expect(orderItem.volume).toBe(10);
  expect(orderItem.density).toBe(3);
  expect(orderItem.quantity).toBe(2);
});
