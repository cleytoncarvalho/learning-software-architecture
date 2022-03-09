interface PlaceOrderOutputProps {
  code: string;
  total: number;
}

export class PlaceOrderOutput {
  readonly code: string;
  readonly total: number;

  constructor(props: PlaceOrderOutputProps) {
    this.code = props.code;
    this.total = props.total;
  }
}
