import { CouponRepositoryMemory } from "../../../infra/repositories/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../../../infra/repositories/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../../../infra/repositories/OrderRepositoryMemory";
import { PlaceOrder } from "./PlaceOrder";

test("place order", () => {
  const orderRepository = new OrderRepositoryMemory();
  const itemRepository = new ItemRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    orderRepository,
    itemRepository,
    couponRepository
  );
  const output = placeOrder.execute({
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
  });
  expect(output.total).toBe(80);
});

test("place order with coupon", () => {
  const orderRepository = new OrderRepositoryMemory();
  const itemRepository = new ItemRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    orderRepository,
    itemRepository,
    couponRepository
  );
  const output = placeOrder.execute({
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
    coupon: "VALE10",
  });
  expect(output.total).toBe(73);
});