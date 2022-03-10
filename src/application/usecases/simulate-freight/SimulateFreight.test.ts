import { ItemRepositoryMemory } from "../../../infra/repositories/ItemRepositoryMemory";
import { SimulateFreight } from "./SimulateFreight";

test("simulate freight", async () => {
  const itemRepository = new ItemRepositoryMemory();
  const simulateFreight = new SimulateFreight(itemRepository);
  const output = await simulateFreight.execute({
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 2 },
    ],
  });
  expect(output.total).toBe(202);
});
