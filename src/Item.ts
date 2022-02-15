export interface ItemProps {
  itemId: number;
  description: string;
  price: number;
}

export class Item {
  readonly itemId: number;
  readonly description: string;
  readonly price: number;

  constructor(props: ItemProps) {
    this.itemId = props.itemId;
    this.description = props.description;
    this.price = props.price;
  }
}
