import { ItemRepositoryMemory } from "../../../infra/repositories/ItemRepositoryMemory";
import { SimulateFreight } from "./SimulateFreight";

test("simulate freight", () => {
  const itemRepository = new ItemRepositoryMemory();
  const simulateFreight = new SimulateFreight(itemRepository);
  const output = simulateFreight.execute({
    freightItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 2 },
    ],
  });
  expect(output.total).toBe(202);
});
