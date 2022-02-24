import { Item } from "../../domain/entities/item/Item";

export interface ItemRepository {
  getById(itemId: number): Item | undefined;
}
