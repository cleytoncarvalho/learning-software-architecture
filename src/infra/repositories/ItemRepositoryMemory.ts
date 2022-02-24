import { ItemRepository } from "../../application/repositories/ItemRepository";
import { Item } from "../../domain/entities/item/Item";

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [
      new Item({
        itemId: 1,
        description: "test 1",
        price: 10,
        height: 10,
        width: 10,
        depth: 10,
        weight: 0.2,
      }),
      new Item({
        itemId: 2,
        description: "test 2",
        price: 20,
        height: 10,
        width: 10,
        depth: 10,
        weight: 10,
      }),
      new Item({
        itemId: 3,
        description: "test 3",
        price: 30,
        height: 10,
        width: 10,
        depth: 10,
        weight: 0.2,
      }),
    ];
  }

  getById(itemId: number): Item | undefined {
    return this.items.find((item) => item.itemId === itemId);
  }
}
