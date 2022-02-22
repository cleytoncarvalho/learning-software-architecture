import { Coupon } from "./Coupon";
import { CouponException, CouponExceptionType } from "./CouponExceptions";
import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";
import { Freight } from "./Freight";

export interface OrderProps {
  cpf: string;
  issueDate: Date;
}

export class Order {
  readonly cpf: Cpf;
  orderItems: OrderItem[] = [];
  coupon: Coupon | undefined;
  readonly issueDate: Date;
  readonly freight: Freight;

  constructor(props: OrderProps) {
    this.cpf = Cpf.create(props.cpf);
    this.issueDate = props.issueDate;
    this.freight = new Freight();
  }

  get subtotal(): number {
    return this.orderItems
      .map((orderItems) => orderItems.total)
      .reduce((partialSum, currentValue) => partialSum + currentValue);
  }

  get shipping(): number {
    return this.freight.total;
  }

  get discount(): number {
    if (!this.coupon?.percentage) return 0;
    return (this.subtotal * this.coupon.percentage) / 100;
  }

  get total(): number {
    return this.subtotal + this.shipping - this.discount;
  }

  addItem(props: { item: Item; quantity: number }) {
    this.freight.addItem({
      item: props.item,
      quantity: props.quantity,
    });
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
