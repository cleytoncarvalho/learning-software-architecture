import { Coupon } from "./Coupon";
import { ExpiredCouponException } from "./CouponExceptions";
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

  get shipping(): number {
    const distance = 1000;
    const minimumShippingPrice = 10;
    let shippingPrice = 0;
    for (const item of this.orderItems) {
      shippingPrice +=
        item.quantity * (distance * item.volume * (item.density / 100));
    }
    if (shippingPrice < minimumShippingPrice) return minimumShippingPrice;
    return shippingPrice;
  }

  get discount(): number {
    if (!this.coupon?.percentage) return 0;
    return (this.subtotal * this.coupon.percentage) / 100;
  }

  get total(): number {
    return this.subtotal + this.shipping - this.discount;
  }

  addItem(item: Item, quantity: number) {
    const { itemId, price, volume, density } = item;
    this.orderItems.push(
      new OrderItem({ itemId, price, quantity, volume, density })
    );
  }

  addCoupon(coupon: Coupon) {
    const currentDate = new Date();
    if (currentDate.getTime() > coupon.expirationDate.getTime())
      throw new ExpiredCouponException();
    this.coupon = coupon;
  }
}
