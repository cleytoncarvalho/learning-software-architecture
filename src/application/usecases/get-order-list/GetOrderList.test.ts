import { OrderRepositoryMemory } from "../../../infra/repositories/OrderRepositoryMemory";
import { GetOrderList } from "./GetOrderList";

test("get order list", async () => {
  const orderRepository = new OrderRepositoryMemory();
  const getOrderList = new GetOrderList(orderRepository);
  const list = await getOrderList.execute();
  expect(list.orders).toHaveLength(1);
});
