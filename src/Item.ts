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

  constructor(props: ItemProps) {
    this.itemId = props.itemId;
    this.description = props.description;
    this.price = props.price;
    this.height = props.height || 0;
    this.width = props.width || 0;
    this.depth = props.depth || 0;
    this.weight = props.weight || 0;
  }

  get volume(): number {
    if (!this.height) return 0;
    if (!this.width) return 0;
    if (!this.depth) return 0;
    return (this.height * this.width * this.depth) / (100 * 100 * 100);
  }

  get density(): number {
    if (!this.weight) return 0;
    if (!this.volume) return 0;
    return Math.round(this.weight / this.volume);
  }
}
