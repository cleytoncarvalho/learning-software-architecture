import axios from "axios";
import { PlaceOrder } from "../../application/usecases/place-order/PlaceOrder";
import { PostgreSQLConnectionAdapter } from "../database/adapters/PostgreSQLConnectionAdapter";
import { RepositoryDatabaseFactory } from "../repositories/database/RepositoryDatabaseFactory";

const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
const repositoryFactory = new RepositoryDatabaseFactory(
  postgreSQLConnectionAdapter
);
const orderRepository = repositoryFactory.createOrderRepository();

beforeEach(async () => {
  await orderRepository.clean();
});

test("get order", async () => {
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
  const placedOrder = await placeOrder.execute(input);
  const result = await axios.get(
    `http://localhost:3000/orders/${placedOrder.code}`
  );
  expect(result.data.code).toBe(placedOrder.code);
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
  const result = await axios.get("http://localhost:3000/orders");
  expect(result.data).toHaveLength(3);
});

afterAll(async () => {
  await postgreSQLConnectionAdapter.close();
});
