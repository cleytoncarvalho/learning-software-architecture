import { Freight } from "../../../domain/entities/freight/Freight";
import { ItemRepository } from "../../repositories/ItemRepository";
import { SimulateFreightInput } from "./SimulateFreightInput";
import { SimulateFreightOutput } from "./SimulateFreightOutput";

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}

  execute(input: SimulateFreightInput): SimulateFreightOutput {
    const freight = new Freight();

    for (const freightItem of input.freightItems) {
      const item = this.itemRepository.getById(freightItem.itemId);
      if (item) freight.addItem({ item, quantity: freightItem.quantity });
    }

    return {
      total: freight.total,
    };
  }
}
