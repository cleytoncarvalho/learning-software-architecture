interface PlaceOrderOutputProps {
  total: number;
}

export class PlaceOrderOutput {
  readonly total: number;

  constructor(props: PlaceOrderOutputProps) {
    this.total = props.total;
  }
}
