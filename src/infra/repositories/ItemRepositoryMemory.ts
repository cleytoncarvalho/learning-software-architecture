import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { Item } from "../../domain/entities/item/Item";

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [
      new Item({
        itemId: 1,
        category: "Instrumentos Musicais",
        description: "Guitarra",
        price: 1000,
        height: 50,
        width: 100,
        depth: 15,
        weight: 3,
      }),
      new Item({
        itemId: 2,
        category: "Instrumentos Musicais",
        description: "Amplificador",
        price: 5000,
        height: 50,
        width: 50,
        depth: 50,
        weight: 22,
      }),
      new Item({
        itemId: 3,
        category: "Acessórios",
        description: "Cabo",
        price: 30,
        height: 10,
        width: 10,
        depth: 10,
        weight: 1,
      }),
    ];
  }

  async getById(itemId: number): Promise<Item | undefined> {
    return this.items.find((item) => item.itemId === itemId);
  }
}
