export interface DimensionProps {
  height: number;
  width: number;
  depth: number;
}

export class Dimension {
  readonly height: number;
  readonly width: number;
  readonly depth: number;

  constructor(props: DimensionProps) {
    this.height = props.height;
    this.width = props.width;
    this.depth = props.depth;
  }

  get volume(): number {
    if (this.height <= 0 || this.width <= 0 || this.depth <= 0) return 0;
    return (this.height / 100) * (this.width / 100) * (this.depth / 100);
  }
}
