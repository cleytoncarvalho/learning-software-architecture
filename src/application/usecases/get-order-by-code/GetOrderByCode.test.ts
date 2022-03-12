import { OrderRepositoryMemory } from "../../../infra/repositories/OrderRepositoryMemory";
import { GetOrderByCode } from "./GetOrderByCode";

test("get order by code", async () => {
  const orderRepositoryMemory = new OrderRepositoryMemory();
  const getOrderByCode = new GetOrderByCode(orderRepositoryMemory);
  const order = await getOrderByCode.execute({ code: "202000000001" });
  expect(order.code).toBe("202000000001");
});
