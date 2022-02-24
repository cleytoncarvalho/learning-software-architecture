export interface FreightItemProps {
  volume: number;
  density: number;
  quantity: number;
}

export class FreightItem {
  readonly volume: number;
  readonly density: number;
  readonly quantity: number;

  constructor(props: FreightItemProps) {
    this.volume = props.volume;
    this.density = props.density;
    this.quantity = props.quantity;
  }
}
