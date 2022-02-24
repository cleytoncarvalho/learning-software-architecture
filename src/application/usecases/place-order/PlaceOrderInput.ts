interface PlaceOrderInputProps {
  cpf: string;
  orderItems: { itemId: number; quantity: number }[];
  coupon?: string;
}

export class PlaceOrderInput {
  readonly cpf: string;
  readonly orderItems: { itemId: number; quantity: number }[];
  readonly coupon?: string;

  constructor(props: PlaceOrderInputProps) {
    this.cpf = props.cpf;
    this.orderItems = props.orderItems;
    this.coupon = props.coupon;
  }
}
