import { Cpf } from "./cpf";
import { Product } from "./product";

export interface OrderProps {
  cpf: string;
  products: Product[];
  discountPercentage?: number;
}

export class Order {
  readonly cpf: Cpf;
  readonly products: Product[];
  readonly discountPercentage: number;

  constructor(props: OrderProps) {
    this.cpf = Cpf.create(props.cpf);
    this.products = props.products;
    this.discountPercentage = props.discountPercentage || 0;
  }

  get subtotal(): number {
    return this.products
      .map((product) => product.total)
      .reduce((partialSum, currentValue) => partialSum + currentValue);
  }

  get discount(): number {
    if (!this.discountPercentage) return 0;
    return (this.subtotal * this.discountPercentage) / 100;
  }

  get total(): number {
    return this.subtotal - this.discount;
  }
}
