import { Item } from "../entities/item/Item";

export interface ItemRepository {
  getById(itemId: number): Item | undefined;
}
