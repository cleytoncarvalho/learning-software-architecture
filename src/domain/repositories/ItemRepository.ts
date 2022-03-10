import { Item } from "../entities/item/Item";

export interface ItemRepository {
  getById(itemId: number): Promise<Item | undefined>;
}
