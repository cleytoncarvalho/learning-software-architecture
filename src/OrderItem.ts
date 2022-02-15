export interface OrderItemProps {
  itemId: number;
  price: number;
  quantity: number;
}

export class OrderItem {
  readonly itemId: number;
  readonly price: number;
  readonly quantity: number;

  constructor(props: OrderItemProps) {
    this.itemId = props.itemId;
    this.price = props.price;
    this.quantity = props.quantity;
  }

  get total(): number {
    return this.quantity * this.price;
  }
}
