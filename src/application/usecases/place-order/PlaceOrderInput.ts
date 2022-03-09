interface PlaceOrderInputProps {
  issueDate: Date;
  cpf: string;
  orderItems: { itemId: number; quantity: number }[];
  coupon?: string;
}

export class PlaceOrderInput {
  readonly issueDate: Date;
  readonly cpf: string;
  readonly orderItems: { itemId: number; quantity: number }[];
  readonly coupon?: string;

  constructor(props: PlaceOrderInputProps) {
    this.issueDate = props.issueDate;
    this.cpf = props.cpf;
    this.orderItems = props.orderItems;
    this.coupon = props.coupon;
  }
}
