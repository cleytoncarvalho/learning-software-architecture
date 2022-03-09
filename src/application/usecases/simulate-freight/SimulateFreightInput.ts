interface SimulateFreightInputProps {
  orderItems: { itemId: number; quantity: number }[];
}

export class SimulateFreightInput {
  readonly orderItems: { itemId: number; quantity: number }[];

  constructor(props: SimulateFreightInputProps) {
    this.orderItems = props.orderItems;
  }
}
