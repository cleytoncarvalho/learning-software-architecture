import { PostgreSQLConnectionAdapter } from "../../../infra/database/adapters/PostgreSQLConnectionAdapter";
import { OrderRepositoryDatabase } from "../../../infra/repositories/OrderRepositoryDatabase";
import { GetOrderList } from "./GetOrderList";

test("get order list", async () => {
  const postgresSQLConnectionAdapter = new PostgreSQLConnectionAdapter();
  const orderRepositoryDatabase = new OrderRepositoryDatabase(
    postgresSQLConnectionAdapter
  );
  const getOrderList = new GetOrderList(orderRepositoryDatabase);
  const list = await getOrderList.execute();
  expect(list.orders).toHaveLength(0);
  postgresSQLConnectionAdapter.close();
});
