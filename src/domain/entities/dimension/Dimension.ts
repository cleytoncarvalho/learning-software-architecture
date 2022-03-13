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
    if (props.height < 0) throw new Error("Height cant be negative");
    if (props.width < 0) throw new Error("Width cant be negative");
    if (props.depth < 0) throw new Error("Depth cant be negative");
    this.height = props.height;
    this.width = props.width;
    this.depth = props.depth;
  }

  get volume(): number {
    if (this.height <= 0 || this.width <= 0 || this.depth <= 0) return 0;
    return (this.height / 100) * (this.width / 100) * (this.depth / 100);
  }
}
