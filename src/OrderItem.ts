export interface OrderItemProps {
  itemId: number;
  price: number;
  quantity: number;
  volume: number;
  density: number;
}

export class OrderItem {
  readonly itemId: number;
  readonly price: number;
  readonly quantity: number;
  readonly volume: number;
  readonly density: number;

  constructor(props: OrderItemProps) {
    this.itemId = props.itemId;
    this.price = props.price;
    this.quantity = props.quantity;
    this.volume = props.volume;
    this.density = props.density;
  }

  get total(): number {
    return this.quantity * this.price;
  }
}
