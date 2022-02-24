import { Coupon } from "../coupon/Coupon";
import {
  CouponException,
  CouponExceptionType,
} from "../coupon/CouponExceptions";
import { Cpf } from "../../values/cpf/Cpf";
import { Item } from "../item/Item";
import { Freight } from "../freight/Freight";
import { OrderItem } from "./OrderItem";

export interface OrderProps {
  cpf: string;
  issueDate: Date;
  lastOrderId?: number;
}

export class Order {
  readonly cpf: Cpf;
  orderItems: OrderItem[] = [];
  coupon: Coupon | undefined;
  readonly issueDate: Date;
  readonly lastOrderId: number;

  private readonly freight: Freight;

  constructor(props: OrderProps) {
    this.cpf = Cpf.create(props.cpf);
    this.issueDate = props.issueDate;
    this.lastOrderId = props.lastOrderId || 0;
    this.freight = new Freight();
  }

  get code(): string {
    const year = this.issueDate.getFullYear();
    const sequencial = `${this.lastOrderId + 1}`.padStart(8, "0");
    return `${year}${sequencial}`;
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
