interface SimulateFreightOutputProps {
  total: number;
}

export class SimulateFreightOutput {
  readonly total: number;

  constructor(props: SimulateFreightOutputProps) {
    this.total = props.total;
  }
}
