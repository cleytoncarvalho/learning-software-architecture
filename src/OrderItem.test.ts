import { OrderItem } from "./OrderItem";

test("create two order items", () => {
  const orderItem1 = new OrderItem({ itemId: 1, price: 20, quantity: 2 });
  const orderItem2 = new OrderItem({ itemId: 2, price: 30, quantity: 1 });
  expect(orderItem1.total).toBe(40);
  expect(orderItem2.total).toBe(30);
});
