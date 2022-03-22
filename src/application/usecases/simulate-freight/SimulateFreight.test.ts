import { PostgreSQLConnectionAdapter } from "../../../infra/database/adapters/PostgreSQLConnectionAdapter";
import { ItemRepositoryDatabase } from "../../../infra/repositories/database/ItemRepositoryDatabase";
import { SimulateFreight } from "./SimulateFreight";

const postgreSQLConnectionAdapter = new PostgreSQLConnectionAdapter();

test("simulate freight", async () => {
  const itemRepository = new ItemRepositoryDatabase(
    postgreSQLConnectionAdapter
  );
  const simulateFreight = new SimulateFreight(itemRepository);
  const output = await simulateFreight.execute({
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 2 },
    ],
  });
  expect(output.total).toBe(470);
});

afterAll(async () => {
  await postgreSQLConnectionAdapter.close();
});
