import { PostgreSQLConnectionAdapter } from "../../../infra/database/adapters/PostgreSQLConnectionAdapter";
import { RepositoryDatabaseFactory } from "../../../infra/repositories/database/RepositoryDatabaseFactory";
import { PlaceOrder } from "../place-order/PlaceOrder";
import { GetOrderList } from "./GetOrderList";

const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(
  postgreSQLConnectionAdapter
);
const orderRepository = repositoryFactory.createOrderRepository();

beforeEach(async () => {
  await orderRepository.clean();
});

test("get order list", async () => {
  const placeOrder = new PlaceOrder(repositoryFactory);
  const input = {
    issueDate: new Date("2019-03-09T10:00:00"),
    cpf: "516.178.806-20",
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
    coupon: "VALE20",
  };
  await placeOrder.execute(input);
  await placeOrder.execute(input);
  await placeOrder.execute(input);
  const getOrderList = new GetOrderList(orderRepository);
  const list = await getOrderList.execute();
  expect(list.orders).toHaveLength(3);
});

afterAll(async () => {
  await postgreSQLConnectionAdapter.close();
});
