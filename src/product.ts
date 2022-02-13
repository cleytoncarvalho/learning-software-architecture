export interface ProductProps {
  description: string;
  price: number;
  quantity: number;
}

export class Product {
  readonly description: string;
  readonly price: number;
  readonly quantity: number;

  constructor(props: ProductProps) {
    this.description = props.description;
    this.price = props.price;
    this.quantity = props.quantity;
  }

  get total(): number {
    return this.quantity * this.price;
  }
}
