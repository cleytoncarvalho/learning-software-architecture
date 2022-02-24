import { OrderItem } from "./OrderItem";

test("create order item", () => {
  const orderItem = new OrderItem({
    itemId: 1,
    price: 20,
    quantity: 2,
    volume: 10,
    density: 3,
  });
  expect(orderItem.itemId).toBe(1);
  expect(orderItem.price).toBe(20);
  expect(orderItem.quantity).toBe(2);
  expect(orderItem.volume).toBe(10);
  expect(orderItem.density).toBe(3);
});

test("calculate order item total", () => {
  const orderItem = new OrderItem({
    itemId: 1,
    price: 20,
    quantity: 2,
    volume: 0,
    density: 0,
  });
  expect(orderItem.total).toBe(40);
});
