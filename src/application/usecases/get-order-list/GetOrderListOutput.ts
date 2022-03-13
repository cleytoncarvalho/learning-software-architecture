import { Order } from "../../../domain/entities/order/Order";

export interface GetOrderListOutputProps {
  orders: Order[];
}

export class GetOrderListOutput {
  readonly orders: Order[];

  constructor(props: GetOrderListOutputProps) {
    this.orders = props.orders;
  }
}
