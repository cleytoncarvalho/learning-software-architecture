import { Item } from "../item/Item";
import { FreightItem } from "./FreightItem";

export class Freight {
  freightItems: FreightItem[] = [];
  private readonly DISTANCE = 1000;

  get total(): number {
    let result = 0;
    for (const item of this.freightItems) {
      result +=
        item.quantity * (this.DISTANCE * item.volume * (item.density / 100));
    }
    const minimumResult = 10;
    if (result < minimumResult) return minimumResult;
    return result;
  }

  addItem(props: { item: Item; quantity: number }) {
    this.freightItems.push(
      new FreightItem({
        volume: props.item.volume,
        density: props.item.density,
        quantity: props.quantity,
      })
    );
  }
}
