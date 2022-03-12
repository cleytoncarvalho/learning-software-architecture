import { Coupon } from "../coupon/Coupon";
import {
  CouponException,
  CouponExceptionType,
} from "../coupon/CouponExceptions";
import { Cpf } from "../cpf/Cpf";
import { Item } from "../item/Item";
import { Freight } from "../freight/Freight";
import { OrderItem } from "./OrderItem";
import { OrderCode } from "./OrderCode";

export interface OrderProps {
  cpf: string;
  issueDate: Date;
  sequence?: number;
}

export class Order {
  readonly code: OrderCode;
  readonly cpf: Cpf;
  readonly orderItems: OrderItem[];
  readonly issueDate: Date;
  coupon: Coupon | undefined;
  private readonly freight: Freight;
  readonly sequence: number | undefined;

  constructor(props: OrderProps) {
    this.sequence = props.sequence;
    this.cpf = Cpf.create(props.cpf);
    this.orderItems = [];
    this.issueDate = props.issueDate;
    this.freight = new Freight();
    this.code = OrderCode.create(props.issueDate, props.sequence);
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
    if (!this.coupon) return 0;
    return this.coupon.getDiscount(this.subtotal);
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
