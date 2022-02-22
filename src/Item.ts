import { Dimension } from "./Dimension";
import { Matter } from "./Matter";

export interface ItemProps {
  itemId: number;
  description: string;
  price: number;
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
}

export class Item {
  readonly itemId: number;
  readonly description: string;
  readonly price: number;
  readonly height: number;
  readonly width: number;
  readonly depth: number;
  readonly weight: number;
  private readonly dimension: Dimension;
  private readonly matter: Matter;

  constructor(props: ItemProps) {
    this.itemId = props.itemId;
    this.description = props.description;
    this.price = props.price;
    this.height = props.height || 0;
    this.width = props.width || 0;
    this.depth = props.depth || 0;
    this.weight = props.weight || 0;
    this.dimension = new Dimension({
      height: this.height,
      width: this.width,
      depth: this.depth,
    });
    this.matter = new Matter({
      mass: this.weight,
      volume: this.dimension.volume,
    });
  }

  get volume() {
    return this.dimension.volume;
  }

  get density() {
    return this.matter.density;
  }
}
