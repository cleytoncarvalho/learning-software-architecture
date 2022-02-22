import { Coupon } from "./Coupon";
import { CouponException, CouponExceptionType } from "./CouponExceptions";
import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

export interface OrderProps {
  cpf: string;
  issueDate: Date;
}

export class Order {
  readonly cpf: Cpf;
  orderItems: OrderItem[] = [];
  coupon: Coupon | undefined;
  readonly issueDate: Date;

  constructor(props: OrderProps) {
    this.cpf = Cpf.create(props.cpf);
    this.issueDate = props.issueDate;
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

  addItem(props: { item: Item; quantity: number }) {
    this.orderItems.push(
      new OrderItem({
        itemId: props.item.itemId,
        price: props.item.price,
        quantity: props.quantity,
        volume: props.item.volume,
        density: props.item.density,
      })
    );
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate))
      throw new CouponException(CouponExceptionType.COUPON_EXPIRED);
    this.coupon = coupon;
  }
}
