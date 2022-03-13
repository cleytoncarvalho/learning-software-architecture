export interface MatterProps {
  mass: number;
  volume: number;
}

export class Matter {
  readonly mass: number;
  readonly volume: number;

  constructor(props: MatterProps) {
    if (props.mass < 0) throw new Error("Mass cant be negative");
    this.mass = props.mass;
    this.volume = props.volume;
  }

  get density(): number {
    if (this.volume <= 0) return 0;
    return Math.round(this.mass / this.volume);
  }
}
