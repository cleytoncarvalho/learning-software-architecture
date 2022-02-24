interface SimulateFreightInputProps {
  freightItems: { itemId: number; quantity: number }[];
}

export class SimulateFreightInput {
  readonly freightItems: { itemId: number; quantity: number }[];

  constructor(props: SimulateFreightInputProps) {
    this.freightItems = props.freightItems;
  }
}
