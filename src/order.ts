import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

export interface OrderProps {
  cpf: string;
}

export class Order {
  cpf: Cpf;
  orderItems: OrderItem[] = [];
  coupon: Coupon | undefined;

  constructor(props: OrderProps) {
    this.cpf = Cpf.create(props.cpf);
  }

  get subtotal(): number {
    return this.orderItems
      .map((orderItems) => orderItems.total)
      .reduce((partialSum, currentValue) => partialSum + currentValue);
  }

  get discount(): number {
    if (!this.coupon?.percentage) return 0;
    return (this.subtotal * this.coupon.percentage) / 100;
  }

  get total(): number {
    return this.subtotal - this.discount;
  }

  addItem(item: Item, quantity: number) {
    const { itemId, price } = item;
    this.orderItems.push(new OrderItem({ itemId, price, quantity }));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }
}
