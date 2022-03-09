import { Order } from "../../domain/entities/order/Order";

export interface OrderRepository {
  save(order: Order): void;
  count(): number;
}
