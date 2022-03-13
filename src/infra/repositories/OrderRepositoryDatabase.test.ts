import { Item } from "../../domain/entities/item/Item";
import { Order } from "../../domain/entities/order/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { PostgreSQLConnectionAdapter } from "../database/adapters/PostgreSQLConnectionAdapter";
import { OrderRepositoryDatabase } from "./OrderRepositoryDatabase";

let postgreSQLConnectionAdapter: PostgreSQLConnectionAdapter;
let orderRepositoryDatabase: OrderRepository;

beforeEach(() => {
  postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
  orderRepositoryDatabase = new OrderRepositoryDatabase(
    postgreSQLConnectionAdapter
  );
});

afterEach(() => {
  postgreSQLConnectionAdapter.close();
});

test("save order using PostgreSQL", async () => {
  const order = new Order({
    cpf: "516.178.806-20",
    issueDate: new Date("2020-10-10T10:00:00"),
    sequence: 1,
  });
  order.addItem({
    item: new Item({
      itemId: 1,
      description: "test",
      price: 10,
      width: 10,
      height: 10,
      depth: 10,
      weight: 1,
    }),
    quantity: 1,
  });
  const savedOrder = await orderRepositoryDatabase.save(order);
  expect(savedOrder).toBeUndefined();
});

test("count order using PostgreSQL", async () => {
  const count = await orderRepositoryDatabase.count();
  expect(count).toBe(1);
});
