import { PostgreSQLConnectionAdapter } from "../../../infra/database/adapters/PostgreSQLConnectionAdapter";
import { RepositoryDatabaseFactory } from "../../../infra/repositories/database/RepositoryDatabaseFactory";
import { PlaceOrder } from "../place-order/PlaceOrder";
import { GetOrderByCode } from "./GetOrderByCode";

const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(
  postgreSQLConnectionAdapter
);
const orderRepository = repositoryFactory.createOrderRepository();

beforeEach(async () => {
  await orderRepository.clean();
});

test("get order by code", async () => {
  const placeOrder = new PlaceOrder(repositoryFactory);
  await placeOrder.execute({
    issueDate: new Date("2019-03-09T10:00:00"),
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
    coupon: "VALE20",
  });
  const getOrderByCode = new GetOrderByCode(orderRepository);
  const order = await getOrderByCode.execute({ code: "201900000001" });
  expect(order.code).toBe("201900000001");
});

afterAll(async () => {
  await postgreSQLConnectionAdapter.close();
});
