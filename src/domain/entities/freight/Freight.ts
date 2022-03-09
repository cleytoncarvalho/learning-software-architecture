import { Item } from "../item/Item";

export class Freight {
  private _total: number;
  private DISTANCE = 1000;

  constructor() {
    this._total = 0;
  }

  addItem(props: { item: Item; quantity: number }) {
    const result =
      props.item.volume *
      this.DISTANCE *
      (props.item.density / 100) *
      props.quantity;
    this._total += parseFloat(Number(result).toFixed(2));
  }

  get total() {
    if (this._total < 10) return 10;
    return this._total;
  }
}
