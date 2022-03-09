import { Order } from "../entities/order/Order";

export interface OrderRepository {
  save(order: Order): void;
  count(): number;
}
