import { Item } from "../../../domain/entities/item/Item";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import { Connection } from "../../database/Connection";

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async getById(itemId: number): Promise<Item | undefined> {
    const [result] = await this.connection.query(
      "select * from ccca.item where id_item = $1",
      [itemId]
    );

    return new Item({
      itemId: result.id_item,
      category: result.category,
      description: result.description,
      price: parseFloat(result.price),
      width: parseInt(result.width),
      height: parseInt(result.height),
      depth: parseInt(result.depth),
      weight: parseInt(result.weight),
    });
  }
}
