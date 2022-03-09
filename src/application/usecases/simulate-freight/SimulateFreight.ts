import { Freight } from "../../../domain/entities/freight/Freight";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import { SimulateFreightInput } from "./SimulateFreightInput";
import { SimulateFreightOutput } from "./SimulateFreightOutput";

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}

  execute(input: SimulateFreightInput): SimulateFreightOutput {
    const freight = new Freight();

    for (const orderItem of input.orderItems) {
      const item = this.itemRepository.getById(orderItem.itemId);
      if (item) freight.addItem({ item, quantity: orderItem.quantity });
    }

    return {
      total: freight.total,
    };
  }
}
